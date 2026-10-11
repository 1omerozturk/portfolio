import InterestsSection from "../components/InterestsSection";
import { createLocalizedPageMetadata } from "../i18n/metadata";
export async function generateMetadata() { return createLocalizedPageMetadata("Diller", "Ömer Öztürk'ün dil bilgisi ve yeterlilik seviyeleri.", "/languages"); }
export default function LanguagesPage() { return <InterestsSection kind="languages" />; }
