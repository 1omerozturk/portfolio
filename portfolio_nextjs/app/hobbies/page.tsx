import InterestsSection from "../components/InterestsSection";
import { createLocalizedPageMetadata } from "../i18n/metadata";
export async function generateMetadata() { return createLocalizedPageMetadata("Hobiler", "Ömer Öztürk'ün ilgi alanları ve hobileri.", "/hobbies"); }
export default function HobbiesPage() { return <InterestsSection kind="hobbies" />; }
