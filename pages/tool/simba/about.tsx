import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";

const About = ({
  tool,
}: {
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

  return (
    <>
      <NextHeadSeo
        title={`${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
          appConfig.appTitle
        }`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
            appConfig.appTitle
          }`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <AboutPage
        {...{
          tool,
          intro:
            "<p>Our tools assist you in understanding German texts by summarising them in simplified language. They are designed to enhance your reading experience and support you learning  the German language.</p>",
          content: `<h3>What is Simba?</h3>

            <p>We have developed two AI-powered tools designed to help people understand German online texts. The first is a web app that allows you to simplify your own texts. The second is a browser extension that automatically summarises texts on websites for you. Both use an AI-based language model to simplify German-language texts automatically.</p>
<p>Simplification involves reducing complexity while retaining the core message. This means replacing longer words with shorter synonyms, shortening sentences, or adding extra information to clarify and explain context. The model that enables these simplifications has been trained and evaluated on news articles, making our tools particularly suited for this type of web content.</p>
<p>Our browser extension scans the first 2700 words on a webpage to provide a simplified summary. If you need to simplify and summarise a longer German text, you can use our web app (the text simplifier), which has no word limit for text analysis.</p>
<p>Please note that we cannot guarantee the model will always provide accurate information. Simba is based on a text generation model, which, like other generative models, can occasionally produce "hallucinations." Please compare the output with the input text to verify its accuracy. You can also provide feedback on how you find the summary created by our browser extension, helping us improve the AI model.
</p>
            
            <h3>What is the goal of Simba?</h3>
            
            <p>Our AI-assisted text simplification tools were developed by members of the “Public Interest AI” research group at the Alexander von Humboldt Institute for Internet and Society. The overarching aim of the research group is to determine what characteristics AI in the public interest should have (you can read more about our thoughts at <a href="/">publicinterest.ai</a>).</p>
            <p>We aim to implement these characteristics in practical prototypes. Simba is one such prototype. Specifically, this means that the code and models behind Simba are open source. This not only facilitates collaboration with others but also provides meaningful transparency about the system. Simba's functionality is also a step towards a larger goal that we see as serving the public interest: making online texts (and thus the internet) more accessible to everyone.</p>

            <h3>How does a summarisation model work in general?</h3>
            There are various methods to automatically create a summary. Simba is based on a “text generation model,” also known as Large Language Models or Foundation Models: ChatGPT and Llama are examples. These are very large neural networks trained on vast amounts of text data. They are trained to predict the next word in a sequence based on the likelihood.
            
            <h3>Which data did we use?</h3>
            We used German-language newspaper articles that were simplified to fine-tune the Llama-3-8B-Instruct foundation model. We used articles from the Austria Presse Agentur, which were simplified by professional translators to levels B1 and A2 of the Common European Framework of Reference for Languages (CEFR). You can find a sample of the dataset <a href="https://github.com/fhewett/apa-rst/tree/main/original_texts">here</a>.
            
            <h3>What do we know about Simba's limitations?</h3>
            <p>Like all text generation models, and as shown in the sample texts, automatically generated summaries and simplifications may contain information that is not accurate. These are known as "hallucinations." We recommend comparing the input and output texts to ensure factual accuracy.</p>
<p>The output may also contain repeated information. Our model has been fine-tuned on Austrian newspaper articles, meaning it performs best with this type of text and the outputs may contain linguistic features unique to Austrian German.</p>

            <h3>I have a specific question on the code, model or data…</h3>
            You can find our code repository <a href="https://github.com/fhewett/simba">here</a> and a sample of the dataset <a href="https://github.com/fhewett/apa-rst/tree/main/original_texts">here</a>. If your question is not answered, feel free to file an issue on our <a href="https://github.com/fhewett/simba">code repository</a>.
            </p>
            `,
          contentSimple: `<h3>What is Simba?</h3>
            <p>Simba consists of two tools that help people understand German online texts. The first is a web app that allows you to simplify your own texts. The second is a browser extension that automatically summarises texts on websites for you. Both tools create a summary of the web page you are looking at. The tools also simplify the summary by shortening the sentences and explaining some words. The summary is created automatically and is not checked by a human.
        
            
            <h3>You can help us make Simba better!</h3>
            <p>We are still working on the tools and making them better. You can send us your feedback directly on the tools.
            The code used to create the tools can be looked at. This means that other people can see exactly how the tools were made. It also means that other people can use the code to make other tools.
            </p>`,
          cta: {
            // title: "Install the plug-in",
            // text: `<p>To install the plug-in please go to the <a target="blank" rel"noreferrer nofollow" href="https://addons.mozilla.org/de/firefox/addon/simba-text-assistant/">Simba page in the Firefox app store</a> or the Chrome app store (depending on what browser you use).</p><p>We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via <a href="mailto:simba@hiig.de">email</a> or any technical issues can be filed in our GitHub repository.</p>`,
            title: "Collaborate with us",
            text: `<p>Our goal is to make online texts and information accessible to as many diverse individuals as possible. These target groups — such as non-native speakers or adults with disabilities — are highly varied. We believe that collaboration is key to enhancing our offerings. Therefore, we invite researchers, professionals, and engaged users to work with us. Their expertise will help us refine our base model and create simplifications suitable for different groups. Our AI model and code are open source.</p>`,
            // text: "<p>To install the plug-in please go to the Simba page in the Firefox app store or the Chrome app store – depending on what browser you use. We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via email or any technical issues can be filed in our GitHub repository.</p>",
            url: "mailto:simba@hiig.de",
            linkTitle: "Write us an email",
          },
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "simba");
  if (!tool)
    return {
      props: {
        frontendSettings: await restApiGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      tool,
      view: "page",
      slug: "about",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

About.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};
export default About;
