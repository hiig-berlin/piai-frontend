import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";

const About = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
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
            "<p>The Simba Text Assistant is designed to improve your online reading experience and support you on your language learning journey. It is a plug-in that runs in your browser and provides summaries and simplifications of the text found on web pages. Our models and code are open source.</p>",
          content:
            `<h3>What is the Simba Text Assistant?</h3>

            <p>The Simba Text Assistant is a browser plug-in that produces summaries of German-language text on web pages. It is designed to additionally simplify the summaries, by shortening the sentences and providing explanations for words. We have also integrated the Hurraki dictionary, and you can choose to highlight words found in the dictionary and in the online text, and be shown their definition in Easy Language.
            We trained and evaluated the model that provides these simplifications with news articles; that is why it works better for these types of web content. The plug-in also offers the opportunity to submit your feedback on the summary that Simba produces.</p>
            
            <p>Please note that we cannot guarantee that the model will always produce factual information. Simba is based on a text generation model, and as other generation models, it can in some cases ‘hallucinate’. Please compare the output to the input and also use the integrated Hurraki dictionary to verify any definitions.</p>
            
            <h3>What's the aim?</h3>
            
            <p>Simba has been created by members of the Public Interest AI research group at the HIIG. The overarching goal of the research group is to carve out what characteristics “public interest AI” should have (our thoughts on this can be found on <a href="/">publicinterest.ai</a>). We also aim to implement these characteristics in practical prototypes; Simba is one of these. Concretely, this means that the code and models behind Simba are open source, which not only allows for collaboration but also provides meaningful transparency about the system. The functionality of Simba is also one step in the direction of a larger goal that we believe to be in the public interest: making online text (and by proxy, the internet) more accessible.</p>
            
            <h3>FAQ</h3>

            <h4>How does a summarisation model work in general?</h4>
            There are different ways of automatically creating a summarisation, Simba is based on a so-called “text generation” model. These text generation models are also referred to as Large Language Models or foundation models: ChatGPT and Llama are examples of these. They are very large neural networks that are fed with a large amount of text data. These networks are trained to calculate what word is most likely to come next in a sequence. 
            
            <h4>What data did we use?</h4>
            We used German-language newspaper articles that have been simplified to fine-tune the foundation model Mistral-7B-v0.1. We use articles from the Austrian Press Agency, which have been simplified by professional translators. They are simplified to the levels B1 and A2 on the Common European Framework of Reference for Languages (CEFR). A sample of the dataset can be found <a href="https://github.com/fhewett/apa-rst/tree/main/original_texts">here</a>.
            
            <h4>What do we know about the limitations of Simba?</h4>
            As with all text generation models, and as may be seen in the example texts, the automatically generated summaries and simplifications may contain information that is not true, so-called “hallucinations”. We recommend comparing the input and output text to ensure the output is factual. The output may also contain repeated information. We fine-tuned our model on newspaper articles from Austria which means that our model works best with this text type and the outputs may contain linguistic characteristics unique to Austrian German.
            
            <h4>I have a specific question on the code, model or data…</h4>
            Our code repository can be found <a href="https://github.com/fhewett/simba">here</a> and a sample of the dataset can be found <a href="https://github.com/fhewett/apa-rst/tree/main/original_texts">here</a>. If your question is not answered, feel free to file an issue on our <a href="https://github.com/fhewett/simba">Simba repository</a>.
            </p>
            `,
          contentSimple:
            `<h3>What is the “Simba Text Assistant”?</h3>
            <p>The “Simba Text Assistant” is a tool that can be used when using the internet. It creates a summary of the web page you are looking at. The tool also simplifies the summary by shortening the sentences and explaining some words. The summary is created automatically and is not checked by a human.
            You can also have words highlighted that are in the Hurraki dictionary. These words are then explained using the dictionary.
            
            <h3>You can help us make the Simba Text Assistant better!</h3>
            <p>We are still working on the tool and making it better. There is an option on the tool where you can send us your feedback. 
            The code used to create the tool can be looked at. This means that other people can see exactly how the tool was made. It also means that other people can use the code to make other tools.
            </p>`,
          cta: {
            // title: "Install the plug-in",
            // text: `<p>To install the plug-in please go to the <a target="blank" rel"noreferrer nofollow" href="https://addons.mozilla.org/de/firefox/addon/simba-text-assistant/">Simba page in the Firefox app store</a> or the Chrome app store (depending on what browser you use).</p><p>We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via <a href="mailto:simba@hiig.de">email</a> or any technical issues can be filed in our GitHub repository.</p>`,
            title: "Collaborate with us",
            text: `<p>The goal of Simba is to reduce complexity of online texts, therefore making them more accessible to a wide range of target groups. These target groups – non-native language users, adults with disabilities, for example – reflect a very heterogeneous group of people and we believe that it is only through collaboration that the tool can truly create simplifications that work for these different groups of people. Our aim is to grow our community by inviting researchers and professionals from the simplification world as well as dedicated users to collaborate and build upon our base model, and to bring in their expertise.</p>`,
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
