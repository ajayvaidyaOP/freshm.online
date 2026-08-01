import React, { useRef } from "react";
import { inrInWords } from "../../utils/numberToWords";

/*
  Purchase invoice bill — reproduces the uploaded SHAAKANI "PURCHASE" format
  (bordered grid, transport details, Unit/Quantity/Rate/Amount, declaration).
  Prints via a clean print window -> browser "Save as PDF" (no PDF library),
  the same mechanism the sale bill uses.

  data = {
    letterHeadName, invoiceNo, date,
    partyName, partyLocation, transportName, vehicleNo, mobileNo,
    items: [{ particulars, unit, quantity, rate, amount }],
    totalAmount, amountInWords?    // amountInWords optional; auto if omitted
  }
*/

const CSS = `
  .pb { width:640px; max-width:100%; margin:0 auto; background:#fff; color:#000;
        font-family: Arial, Helvetica, sans-serif; font-size:13px; box-sizing:border-box;
        border:2px solid #000; }
  .pb * { box-sizing:border-box; }
  .pb-title { text-align:center; font-weight:800; font-size:22px; padding:8px 6px; border-bottom:2px solid #000; }
  .pb-sub { text-align:center; font-weight:700; font-size:15px; padding:5px; border-bottom:2px solid #000; }
  .pb-meta { display:flex; border-bottom:2px solid #000; }
  .pb-party { flex:1; padding:6px 8px; border-right:2px solid #000; line-height:1.5; }
  .pb-party .b { font-weight:700; }
  .pb-inv { width:250px; display:flex; flex-direction:column; }
  .pb-inv-row { display:flex; border-bottom:1px solid #000; }
  .pb-inv-row:last-child { border-bottom:none; }
  .pb-inv-row .k { padding:6px 8px; border-right:1px solid #000; flex:1; }
  .pb-inv-row .v { padding:6px 8px; font-weight:700; text-align:center; width:110px; }
  table.pb-t { width:100%; border-collapse:collapse; }
  table.pb-t th, table.pb-t td { border:1px solid #000; padding:5px 6px; }
  table.pb-t th { border-top:none; text-align:center; font-weight:700; }
  table.pb-t td.c { text-align:center; } table.pb-t td.r { text-align:right; }
  .pb-t .filler td { height:22px; }
  .pb-words { border-top:2px solid #000; }
  .pb-words .lbl { padding:5px 8px; border-bottom:1px solid #000; }
  .pb-words .val { padding:6px 8px; font-weight:700; border-bottom:2px solid #000; }
  .pb-decl { display:flex; border-bottom:2px solid #000; }
  .pb-decl .l { flex:1; padding:6px 8px; border-right:2px solid #000; }
  .pb-decl .r { width:250px; }
  .pb-foot { text-align:center; padding:6px; font-size:12px; }
  @media print { @page { size:A4; margin:12mm; } body{ margin:0; } .no-print{ display:none !important; } }
`;

const money = (n) => Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

function Body({ data }) {
  const d = data || {};
  const items = d.items || [];
  const total = d.totalAmount != null ? d.totalAmount : items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
  const fillers = Math.max(0, 8 - items.length);
  const words = d.amountInWords || inrInWords(total);

  return (
    <div className="pb" id="pb-print-area">
      <div className="pb-title">{d.letterHeadName || "COMPANY NAME"}</div>
      <div className="pb-sub">PURCHASE</div>

      <div className="pb-meta">
        <div className="pb-party">
          <div className="b">{d.partyName || "--"}</div>
          {d.partyLocation ? <div>{d.partyLocation}</div> : null}
          <div className="b" style={{ marginTop: 4 }}>TRANSPORT DETAILS</div>
          {d.transportName ? <div>{d.transportName}</div> : null}
          {d.vehicleNo ? <div className="b">{d.vehicleNo}</div> : null}
          {d.mobileNo ? <div>MOBILE NO= {d.mobileNo}</div> : null}
        </div>
        <div className="pb-inv">
          <div className="pb-inv-row"><div className="k">Invoice No:</div><div className="v">{d.invoiceNo || "--"}</div></div>
          <div className="pb-inv-row"><div className="k">Date:</div><div className="v">{d.date || "--"}</div></div>
          <div className="pb-inv-row" style={{ flex: 1 }}><div className="k">&nbsp;</div><div className="v">&nbsp;</div></div>
        </div>
      </div>

      <table className="pb-t">
        <thead>
          <tr>
            <th style={{ width: 50 }}>Sr No.</th>
            <th>Particulars</th>
            <th style={{ width: 60 }}>Unit</th>
            <th style={{ width: 78 }}>Quantity</th>
            <th style={{ width: 54 }}>Rate</th>
            <th style={{ width: 84 }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td className="c">{i + 1}</td>
              <td>{it.particulars}</td>
              <td className="c">{it.unit != null && it.unit !== "" ? it.unit : ""}</td>
              <td className="c">{it.quantity != null && it.quantity !== "" ? money(it.quantity) : ""}</td>
              <td className="c">{it.rate != null && it.rate !== "" ? money(it.rate) : ""}</td>
              <td className="r">{it.amount != null && it.amount !== "" ? money(it.amount) : ""}</td>
            </tr>
          ))}
          {Array.from({ length: fillers }).map((_, i) => (
            <tr className="filler" key={`f${i}`}><td /><td /><td /><td /><td /><td /></tr>
          ))}
          <tr>
            <td /><td /><td /><td /><td className="c" style={{ fontWeight: 700 }}></td>
            <td className="r" style={{ fontWeight: 700 }}>{money(total)}</td>
          </tr>
        </tbody>
      </table>

      <div className="pb-words">
        <div className="lbl">Bill Amount (In Words)</div>
        <div className="val">{words}</div>
      </div>

      <div className="pb-decl">
        <div className="l">
          <div style={{ fontWeight: 700 }}>Declaration:</div>
          <div>We declare that this invoice shows the</div>
        </div>
        <div className="r" />
      </div>

      <div className="pb-foot">This invoice is computer generated no signature required</div>
    </div>
  );
}

export default function PurchaseBill({ data }) {
  const ref = useRef(null);
  const download = () => {
    const html = ref.current?.querySelector("#pb-print-area")?.outerHTML || "";
    const w = window.open("", "_blank", "width=820,height=1000");
    if (!w) return;
    w.document.write(
      `<html><head><title>Purchase Invoice</title><style>${CSS}</style></head><body>${html}` +
      `<script>window.onload=function(){setTimeout(function(){window.print();},250);};<\/script></body></html>`
    );
    w.document.close();
  };
  return (
    <div>
      <style>{CSS}</style>
      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button onClick={download} style={{ background: "#0F2E20", color: "#fff", border: "none",
          borderRadius: 10, padding: "10px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
          Download / Print PDF
        </button>
      </div>
      <div ref={ref}><Body data={data} /></div>
    </div>
  );
}
