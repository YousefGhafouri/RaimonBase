import { AnalysisWebWorker } from "yoastseo";
import PersianResearcher from "yoastseo/build/languageProcessing/languages/fa/Researcher";

const worker = new AnalysisWebWorker( self, new PersianResearcher() );
// Any custom registration should be done here (or send messages via postMessage to the wrapper).
worker.register();