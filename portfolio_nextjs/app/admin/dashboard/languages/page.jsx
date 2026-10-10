"use client";
import SimpleCollectionManager from "../../components/SimpleCollectionManager";
import { getLanguages, createLanguages, updateLanguages, deleteLanguages } from "../../../api/api";
const fields = [{ name: "name", label: "Dil adı" }, { name: "proficiency", label: "Yeterlilik seviyesi" }];
export default function LanguagesDashboard() { return <SimpleCollectionManager title="Diller" fields={fields} load={getLanguages} create={createLanguages} update={updateLanguages} remove={deleteLanguages} />; }

