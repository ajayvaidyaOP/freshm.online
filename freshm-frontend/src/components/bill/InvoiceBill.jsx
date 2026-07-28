import React, { useRef } from "react";

/*
  Shared invoice bill — reproduces the uploaded SHAAKANI format exactly.
  Used for BOTH sale and purchase; only `type` (title) and the party label change.
  "Download PDF" opens a clean print window and calls print() -> browser "Save as PDF",
  so there's no PDF-library dependency.

  Props:
    type          "SALE" | "PURCHASE"     (controls the little INVOICE title only)
    logoSrc       url/import of the freshm logo (optional)
    data = {
      letterHeadName, invoiceNumber, date,
      partyLabel ("Buyer" | "Vendor" | "Farmer"), partyName, partyMobile, partyAddress,
      items: [{ desc, item, weight, price, amount }],
      charges: [{ label, amount }],          // Hamali, Comission, Transport Advance
      grandTotal, amountInWords
    }
*/

const CSS = `
  .inv-wrap { background:#fff; color:#111; width:820px; max-width:100%; margin:0 auto;
              padding:34px 40px; font-family: Arial, Helvetica, sans-serif; box-sizing:border-box; }
  .inv-bless { text-align:center; font-size:14px; color:#111; line-height:1.7; }
  .inv-head { display:flex; align-items:center; gap:18px; margin-top:8px; }
  .inv-logo { width:96px; height:96px; border-radius:50%; object-fit:cover; flex:0 0 auto; background:#fff; }
  .inv-title { flex:1; text-align:center; }
  .inv-company { font-size:34px; font-weight:800; color:#c1121f; letter-spacing:.5px; line-height:1.05; margin:0; }
  .inv-hr { border:none; border-top:2px solid #111; margin:16px 0; }
  .inv-meta { display:flex; justify-content:space-between; font-size:16px; margin-bottom:6px; }
  .inv-meta b, .inv-buyer b { color:#c1121f; }
  .inv-buyer { font-size:16px; margin:10px 0 16px; }
  table.inv { width:100%; border-collapse:collapse; font-size:15px; }
  table.inv th, table.inv td { border:1px solid #111; padding:8px 10px; }
  table.inv th { color:#c1121f; font-weight:700; text-align:center; }
  table.inv td.c { text-align:center; } table.inv td.r { text-align:right; }
  .inv-charge td { text-align:right; }
  .inv-charge td.lbl { text-align:left; }
  .inv-grand td { font-weight:800; color:#0b1e6b; font-size:17px; }
  .inv-words { color:#c1121f; font-style:italic; margin:16px 2px; font-size:15px; }
  .inv-sign { text-align:right; margin-top:26px; font-size:15px; }
  .inv-sign .for { color:#c1121f; font-weight:700; }
  .inv-sign .line { display:inline-block; margin-top:34px; border-top:1px dotted #333; padding-top:4px; min-width:220px; }
  @media print { @page { size:A4; margin:12mm; } body { margin:0; } .no-print { display:none !important; } }
`;

const rs = (n) => `Rs ${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function BillBody({ type, data, logoSrc }) {
  const d = data || {};
  const items = d.items || [];
  const charges = d.charges || [];
  return (
    <div className="inv-wrap" id="inv-print-area">
      <div className="inv-bless">॥ श्री तुळजाभवानी प्रसन्नवुतु प्रसन्न ॥<br />॥ श्री गजानन प्रसन्न ॥</div>

      <div className="inv-head">
        {logoSrc ? <img className="inv-logo" src={logoSrc} alt="logo" /> : <span className="inv-logo" />}
        <div className="inv-title">
          <p className="inv-company">{d.letterHeadName || "COMPANY NAME"}</p>
        </div>
        <span style={{ width: 96, flex: "0 0 auto" }} />
      </div>

      <hr className="inv-hr" />

      <div className="inv-meta">
        <span><b>Bill No. :</b> {d.invoiceNumber || "--"}</span>
        <span><b>Date :</b> {d.date || "--"}</span>
      </div>
      <div className="inv-buyer"><b>{d.partyLabel || "Buyer"} :</b> {d.partyName || "--"}</div>

      <table className="inv">
        <thead>
          <tr>
            <th style={{ width: 44 }}>Sr</th>
            <th>Material Desc.</th>
            <th style={{ width: 90 }}>Item</th>
            <th style={{ width: 110 }}>Weight</th>
            <th style={{ width: 100 }}>Price</th>
            <th style={{ width: 140 }}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td className="c">{i + 1}</td>
              <td>{it.desc}</td>
              <td className="c">{it.item != null && it.item !== "" ? Number(it.item).toFixed(2) : ""}</td>
              <td className="c">{it.weight ? `${Number(it.weight).toLocaleString("en-IN")} kg` : ""}</td>
              <td className="c">{it.price != null && it.price !== "" ? `${Number(it.price).toFixed(2)} rs` : ""}</td>
              <td className="r">{rs(it.amount)}</td>
            </tr>
          ))}
          {charges.map((c, i) => (
            <tr className="inv-charge" key={`c${i}`}>
              <td /><td className="lbl" colSpan={4}>{c.label}</td>
              <td className="r">{rs(c.amount)}</td>
            </tr>
          ))}
          <tr className="inv-grand">
            <td /><td colSpan={4}>Grand Total</td>
            <td className="r">{rs(d.grandTotal)}</td>
          </tr>
        </tbody>
      </table>

      <div className="inv-words">{d.amountInWords || ""}</div>

      <div className="inv-sign">
        <div className="for">For {d.letterHeadName || "COMPANY NAME"}</div>
        <div className="line">Authorized Signatory</div>
      </div>
    </div>
  );
}

export default function InvoiceBill({ type = "SALE", data, logoSrc }) {
  const ref = useRef(null);

  const download = () => {
    const html = ref.current?.querySelector("#inv-print-area")?.outerHTML || "";
    const w = window.open("", "_blank", "width=900,height=1000");
    if (!w) return;
    w.document.write(
      `<html><head><title>${type === "PURCHASE" ? "Purchase" : "Sale"} Invoice</title>` +
      `<style>${CSS}</style></head><body>${html}` +
      `<script>window.onload=function(){setTimeout(function(){window.print();},250);};<\/script>` +
      `</body></html>`
    );
    w.document.close();
  };

  return (
    <div>
      <style>{CSS}</style>
      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          onClick={download}
          style={{
            background: "#0F2E20", color: "#fff", border: "none", borderRadius: 10,
            padding: "10px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14,
          }}
        >
          Download / Print PDF
        </button>
      </div>
      <div ref={ref} style={{ border: "1px solid #eee", boxShadow: "0 10px 40px -20px rgba(0,0,0,.4)" }}>
        <BillBody type={type} data={data} logoSrc={logoSrc} />
      </div>
    </div>
  );
}
