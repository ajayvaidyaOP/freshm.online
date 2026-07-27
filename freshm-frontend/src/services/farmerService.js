import api from "./api";



// GET ALL FARMERS
export const getAllFarmers = async () => {
    const response = await api.get("/farmers");
    return response.data;
};


// GET FARMER BY ID
export const getFarmerById = async (id) => {
    const response = await api.get(`/farmers/${id}`);
    return response.data;
};


// CREATE FARMER WITH FILES
export const createFarmer = async (farmerData, files) => {

    const formData = new FormData();


    formData.append(
        "farmer",
        new Blob(
            [JSON.stringify(farmerData)],
            {
                type: "application/json"
            }
        )
    );


    if(files.aadharFile){
        formData.append(
            "aadharFile",
            files.aadharFile
        );
    }


    if(files.panFile){
        formData.append(
            "panFile",
            files.panFile
        );
    }


    if(files.bankPassbookFile){
        formData.append(
            "bankPassbookFile",
            files.bankPassbookFile
        );
    }


    const response = await api.post(
        "/farmers",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );


    return response.data;
};



// UPDATE FARMER
export const updateFarmer = async(id,data)=>{

    const response = await api.put(
        `/farmers/${id}`,
        data
    );

    return response.data;
};



// DELETE FARMER
export const deleteFarmer = async(id)=>{

    const response = await api.delete(
        `/farmers/${id}`
    );

    return response.data;
};



// CHANGE STATUS
export const changeFarmerStatus = async(id,status)=>{

    const response = await api.put(
        `/farmers/${id}/status?status=${status}`
    );

    return response.data;
};
