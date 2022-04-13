import parser from 'xml2json';
import fs from 'fs/promises'
import pkg from '@prisma/client';
import { async } from 'rxjs';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();


const data = async () => {
    let data = await fs.readFile( './livsmedel.xml');
    let dataAsJson = parser.toJson(data);
    return JSON.parse(dataAsJson);
}

async function addProductToDb() {
    let livsMedelsData = await data();

    for (const data of livsMedelsData.LivsmedelDataset.LivsmedelsLista.Livsmedel) {
        await prisma.product.create({
            data: {
                name: data.Namn,
                number: parseInt(data.Nummer),
                main_group: data.Huvudgrupp
            }
        });
    };
};

//addProductToDb();

async function addNutriansToDb() {
    let livsMedelsData = await data();

    for (const data of livsMedelsData.LivsmedelDataset.LivsmedelsLista.Livsmedel[0].Naringsvarden.Naringsvarde) {
        await prisma.nutrients.create({
            data: {
                name: data.Namn,
                unit: data.Enhet
            }
        });
    };
};

//addNutriansToDb();

async function addProductDataToDb() {
    let livsMedelsData = await data();
    let count = 0;
    let created;

    // loop over every object and populate the database with data from livsmedelsverket.
    for (const data of livsMedelsData.LivsmedelDataset.LivsmedelsLista.Livsmedel) {  //.LivsmedelDataset.LivsmedelsLista.Livsmedel
        //data.Naringsvarden.Naringsvarde.forEach(c => console.log(c))
        for (const c of data.Naringsvarden.Naringsvarde) {
            created = await prisma.product_data.create({
                data: {
                    weight_gram: parseInt(data.ViktGram),
                    value: parseFloat(c.Varde),
                    product_name: data.Namn,
                    nutrients_name: c.Namn,
                },
            }).catch(err => console.log(err))
        }
        count += 1;
        console.log('added ' + count, 'created ' + created);
    };
};

//addProductDataToDb();

const query = async () => {
    let x = await prisma.product_data.findMany({
        where: {
            product: {
                number: 737
            }
        },
        include: {
            product: true,
            nutrients: true 
        }
    })
    console.log(x)
};

query();
