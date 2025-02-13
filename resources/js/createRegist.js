import { postData, fetchData } from "./api";

export async function createRegist() {
    const user_id = sessionStorage.getItem("idUser");
    const cicle_id = localStorage.getItem("cicle_id");
    const composter_id = localStorage.getItem("composter_id");
    const now = new Date();
    const date = now.toISOString().replace("T", " ").split(".")[0];
    const cicle_start = 1;
    const registData = {
        user_id,
        cicle_id,
        composter_id,
        date,
        cicle_start,
    };
    console.log("Datos enviados a /api/regist:", registData);
    const response = await postData("/api/regist", registData);

    getIdRegister();
}

function getIdRegister() {
    fetchData(`/api/exactregist/lastRegist`)
        .then((registData) => {
            console.log("ID del registro:", registData.id);
            localStorage.setItem("regist_id", JSON.stringify(registData.id));
            createBeforeForm();
        })
        .catch((error) => {
            console.error("Error al obtener el registro:", error);
        });
}

async function createBeforeForm() {
    // Obtener el objeto completo del local storage
    const beforeFormData =
        JSON.parse(localStorage.getItem("beforeFormData")) || {};
    const regist_id = JSON.parse(localStorage.getItem("regist_id"));

    // Extraer los valores individuales del objeto
    const tempAmbient = beforeFormData.temp_ambient || "";
    const tempCompost = beforeFormData.temp_compost || "";
    const fillLevel = beforeFormData.fill_level || "";
    const olor = beforeFormData.olor || "";
    const insectStatus = beforeFormData.insect_status || "0";
    const insectDescription = beforeFormData.insect_description || "";
    const humidity = beforeFormData.humidity || "";
    const initialPhotos = beforeFormData.initial_photos || "";
    const initialObservations = beforeFormData.initial_observations || "";

    // Puedes usar estas variables para procesar o enviar datos

    const beforeData = {
        regist_id,
        temp_ambient: tempAmbient,
        temp_compost: tempCompost,
        fill_level: fillLevel,
        olor,
        insect_status: insectStatus,
        insect_description: insectDescription,
        humidity,
        initial_photos: initialPhotos,
        initial_observations: initialObservations,
    };

    console.log("Datos enviados a /api/before:", beforeData);
    const response = await postData("/api/before", beforeData);

    createDuringForm();
}

async function createDuringForm() {
    // Obtener el objeto completo del local storage
    const duringFormData =
        JSON.parse(localStorage.getItem("duringFormData")) || {};

    const regist_id = JSON.parse(localStorage.getItem("regist_id"));

    // Extraer los valores individuales del objeto
    const wateringDone = duringFormData.watering_done || "0";
    const stirringDone = duringFormData.stirring_done || "0";
    const greenDeposit = duringFormData.green_deposit || "0";
    const dryDeposit = duringFormData.dry_deposit || "0";
    const greenQuantity = duringFormData.green_quantity || "";
    const greenType = duringFormData.green_type || "";
    const dryQuantity = duringFormData.dry_quantity || "";
    const dryType = duringFormData.dry_type || "";
    const photo = duringFormData.photo || "";
    const observations = duringFormData.observations || "";

    // Puedes usar estas variables para procesar o enviar datos
    const duringData = {
        regist_id,
        watering_done: wateringDone,
        stirring_done: stirringDone,
        green_deposit: greenDeposit,
        green_quantity: greenQuantity ? parseInt(greenQuantity) : null,
        green_type: greenType || null,
        dry_deposit: dryDeposit,
        dry_quantity: dryQuantity ? parseInt(dryQuantity) : null,
        dry_type: dryType || null,
        photo: photo || null,
        observations: observations || null,
    };

    console.log("Datos enviados a /api/during:", duringData);
    const response = await postData("/api/during", duringData);
    createAfterForm();
}

async function createAfterForm() {
    // Obtener el objeto completo del local storage
    const afterFormData =
        JSON.parse(localStorage.getItem("afterFormData")) || {};

    const regist_id = JSON.parse(localStorage.getItem("regist_id"));

    // Extraer los valores individuales del objeto
    const fillLevel = afterFormData.fill_level || "0%";
    const photo = afterFormData.photo || "";
    const observations = afterFormData.observations || "";
    const endCicle = afterFormData.end_Cicle || "0";

    // Puedes usar estas variables para procesar o enviar datos
    const afterData = {
        regist_id,
        fill_level: fillLevel || null,
        photo: photo || null,
        observations: observations || null,
    };

    console.log("Datos enviados a /api/after:", afterData);
    const response = await postData("/api/after", afterData);
}
