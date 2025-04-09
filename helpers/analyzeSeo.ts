// @ts-ignore
import { AnalysisWorkerWrapper, Paper as seoPaper } from 'yoastseo';
import Worker from './seoWorker?worker';
const worker = new AnalysisWorkerWrapper(new Worker());
worker.initialize({
    logLevel: 'TRACE', // Optional, see https://github.com/pimterry/loglevel#documentation
})


const defaultAttributes = {
    keyword: '',
    synonyms: '',
    description: '',
    title: '',
    titleWidth: 0,
    slug: '',
    locale: 'fa_IR',
    permalink: '',
    date: '',
    customData: {},
    textTitle: '',
    writingDirection: 'LTR',
    wpBlocks: [],
    isFrontPage: false,
};

export const analyzeSEO = async ({
    text,
    attributes = defaultAttributes,
}: any) => {
    const paper = new seoPaper(text, attributes);
  
    // const paper = new seoPaper(text, attributes);
    
    const data = worker.analyze(paper);
    return data
};