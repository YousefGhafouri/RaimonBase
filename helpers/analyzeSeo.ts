// @ts-ignore
import { AnalysisWorkerWrapper, Paper as seoPaper } from 'yoastseo';
import Worker from './seoWorker?worker';
const worker = new AnalysisWorkerWrapper(new Worker());

const defaultAttributes = {
    keyword: "",
    synonyms: "",
    description: "",
    title: "",
    titleWidth: 0,
    slug: "",
    locale: "en_US",
    permalink: "",
    date: "",
    customData: {},
    textTitle: "",
    writingDirection: "LTR",
    wpBlocks: [],
    isFrontPage: false
  };

export const analyzeSEO = async ({text,attributes=defaultAttributes}: any) => {
  return worker
      .initialize({
          logLevel: 'TRACE', // Optional, see https://github.com/pimterry/loglevel#documentation
      })
      .then(() => {
          // The worker has been configured, we can now analyze a Paper.
          const paper = new seoPaper(text, attributes);

          return worker.analyze(paper);
      })
      .then((results: any) => {
          console.log('Analysis results:');
          console.log(results);
          return results
      })
      .catch((error: any) => {
          console.error('An error occured while analyzing the text:');
          console.error(error);
      });
};