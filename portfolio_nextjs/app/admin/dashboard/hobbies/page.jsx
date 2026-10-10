"use client";
import SimpleCollectionManager from "../../components/SimpleCollectionManager";
import { getHobbies, createHobbies, updateHobbies, deleteHobbies } from "../../../api/api";
const fields = [{ name: "name", label: "Hobi adı" }, { name: "description", label: "Açıklama", multiline: true }, { name: "icon", label: "İkon adı" }];
export default function HobbiesDashboard() { return <SimpleCollectionManager title="Hobiler" fields={fields} load={getHobbies} create={createHobbies} update={updateHobbies} remove={deleteHobbies} />; }

