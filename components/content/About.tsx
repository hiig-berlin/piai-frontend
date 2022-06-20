import React from "react";
import styled from "styled-components";
import { LabElement } from "../ui/LabElement";
import PageMargins from "../ui/PageMargins";
import Button from "../styled/Button";
import { SvgBackground } from "../ui/SvgBackground";

const AboutContainer = styled.div`
  color: white;
  font-size: 0.85em;

  h2 {
    ${({ theme }) => theme.textStyle("h3")}
    ${({ theme }) => theme.applyMixin("uppercase")}
    font-weight: bold;
    color: white;
  }

  p {
    max-width: 80%;
    margin: var(--size-3) 0;
  }

  button {
    margin-left: 0;
  }

  .labElement {
    float: left;
    margin: 0 10px 0 0;
  }

  .labElement + p {
    margin: 0;
  }

  .infoboxes {
    margin-top: var(--size-5);
    height: auto;
  }
`;

const Infobox = styled.article`
  position: relative;
  height: 0%;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: -150%;

  & svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 0;

    g {
      fill: #fff;
      stroke: #707070;
      stroke-width: 1;
    }
  }

  & h3,
  & p,
  & a {
    z-index: 1;
    position: relative;
  }

  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")}
    color: var(--color-text);
    font-weight: 700;
    font-size: calc(var(--text-body-font-size) * 0.7);
    padding: 30px 10px 0 25px;
  }

  & p {
    padding: 10px 10px 0 25px;
    font-size: calc(var(--text-body-font-size) * 0.85);
    color: var(--color-text-grey);
    margin: 0;
  }

  & a {
    padding: 10px 25px 0;
    text-align: right;
    display: block;
  }
`;

const Grid = styled.div<{ col: number }>`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: var(--size-gutter-width);
`;

export const About = () => {
  return (
    <PageMargins
      bgColor="var(--color-piai-interface)"
      spaceTop={6}
      spaceBottom={2}
    >
      <AboutContainer>
        <Grid col={2}>
          <div>
            <h2>{aboutContent.about.headline}</h2>
            <p>{aboutContent.about.text}</p>
            {/* TODO: Button with href as link */}
            {/* <Button href={aboutContent.about.ctaUrl}> */}
            <Button>{aboutContent.about.ctaText}</Button>
          </div>
          <div>
            <h2>{aboutContent.toolbox.headline}</h2>
            <p>{aboutContent.toolbox.text}</p>
            <Grid col={2}>
              {aboutContent.toolbox.tools.map((tool: any, index: number) => {
                return (
                  <div key={`tool-${index}`}>
                    <LabElement
                      shortHandle={tool.shortHandle}
                      longText={tool.longText}
                      color="white"
                      hoverColor="#ffffffaa"
                      size={1.6}
                    />
                    <p>{tool.description}</p>
                  </div>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid col={aboutContent.boxes.length} className="infoboxes">
          {aboutContent.boxes.map((box: any, index: number) => {
            return (
              <Infobox key={`box-${index}`}>
                {/* <SvgBackground type={`square1`} /> */}
                <BoxSvgs i={index + 1} />
                <h3>{box.title}</h3>
                <p>{box.description}</p>
                <a href={box.linkUrl} rel="noreferrer nofollow" target="_blank">
                  {box.linkText}
                </a>
              </Infobox>
            );
          })}
        </Grid>
      </AboutContainer>
    </PageMargins>
  );
};

const aboutContent = {
  about: {
    headline: "Who's behind publicinterest.ai?",
    text: "This website is a space to share knowledge and foster collaboration on AI in the public interest. The research that backs the content of this website is undertaken at the Alexander von Humboldt Institute for Internet and Society (HIIG) in Berlin in cooperation with a wide group of experts. be launched soon. Visit our project website to find out more about our research and other related content.",
    ctaText: "Visit research project website",
    ctaUrl: "https://www.hiig.de/en/project/public-interest-ai/",
  },
  toolbox: {
    headline: "The publicinterest.ai toolbox",
    text: "Besides this knowledge resource, we’re showcaseing a handful of projects on public interest AI. This toolbox is a work in progress and open for ideas and collaborators. So some back, once in a while to see what’s new and contact us, if you want to contribute with a tool.",
    tools: [
      {
        shortHandle: "Ma",
        longText: "Project Map",
        description: "Map and directory of PIAI projects",
      },
      {
        shortHandle: "En",
        longText: "Energy Usage",
        description: "Measure you AI’s energy consumption",
      },
    ],
  },
  boxes: [
    {
      title: "Open talks",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Watch on youtube",
      linkUrl: "https://youtube.com",
    },
    {
      title: "Instagram",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Go to channel",
      linkUrl: "https://instagram.com",
    },
    {
      title: "Blogposts",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Read the posts",
      linkUrl: "https://hiig.de",
    },
    {
      title: "Further resources",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Read the posts",
      linkUrl: "https://github.com",
    },
  ],
};

const BoxSvgs = ({ i }: { i: number }) => {
  switch (i) {
    case 1:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 282.921 277.991"
          // preserveAspectRatio="none"
          vectorEffect="non-scaling-stroke"
        >
          <g
            id="Square1"
            data-name="Square1"
            transform="translate(5.96)"
            fill="#fff"
            stroke="#000"
          >
            <path
              d="M0,0S20.611,4.539,55.825,6.165,108.432,0,164.286,0H276s2.162,17.519,0,46.652c-.926,12.475-12.722,33.364-5.96,53.921,4.236,12.878,0,34.736,0,46.356,0,70.75,6.921,123.219,6.921,123.219s-22.22,7.842-91.22,7.842c-35.535,0-85.969-9.311-121.416-7.842-33.151,1.374-70.286,0-70.286,0S.961,298.753.961,228c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z"
              stroke="none"
            />
            <path
              d="M 164.2854919433594 1 C 135.6211090087891 1 117.2769927978516 3.036956787109375 101.0923004150391 4.8341064453125 C 88.75030517578125 6.204620361328125 78.09138488769531 7.38818359375 65.37710571289062 7.38818359375 C 62.23085021972656 7.38818359375 59.00164794921875 7.312774658203125 55.77923583984375 7.163970947265625 C 37.55010986328125 6.322357177734375 23.30703735351562 4.686920166015625 14.56854248046875 3.463165283203125 C 7.4051513671875 2.459991455078125 2.65826416015625 1.56011962890625 0.7420654296875 1.174957275390625 C 0.27459716796875 3.1939697265625 -0.85870361328125 8.629058837890625 -1.98699951171875 18.12661743164062 C -2.84967041015625 25.38827514648438 -3.537109375 33.55050659179688 -4.030303955078125 42.38653564453125 C -4.647186279296875 53.43904113769531 -4.959991455078125 65.58100891113281 -4.959991455078125 78.47508239746094 C -4.959991455078125 111.8493499755859 -2.52935791015625 148.7006530761719 -0.57623291015625 178.3111572265625 C 0.78515625 198.9511566162109 1.96087646484375 216.7765045166016 1.96087646484375 228.0029296875 C 1.96087646484375 247.8354797363281 1.41424560546875 261.7288208007812 0.335540771484375 269.3410949707031 C 6.6419677734375 269.5103759765625 18.16921997070312 269.7595520019531 31.36976623535156 269.7595520019531 C 43.44718933105469 269.7595520019531 54.52119445800781 269.5543823242188 64.28422546386719 269.1497802734375 C 66.81460571289062 269.044921875 69.52149963378906 268.9917297363281 72.32962036132812 268.9917297363281 C 89.98007202148438 268.9917297363281 110.6327362060547 271.0682373046875 130.6053771972656 273.0763549804688 C 150.6290740966797 275.0895690917969 169.5422668457031 276.9912109375 185.7412261962891 276.9912109375 C 201.4101104736328 276.9912109375 215.9376220703125 276.5821228027344 228.9201507568359 275.7753601074219 C 239.3086090087891 275.1297302246094 248.7369537353516 274.2294921875 256.9432983398438 273.099609375 C 268.0516662597656 271.5701293945312 273.9022521972656 270.0245361328125 275.8634033203125 269.44482421875 C 275.4603271484375 266.2166137695312 273.9732360839844 253.8031311035156 272.5035705566406 235.1491241455078 C 270.9235229492188 215.0941467285156 269.0400390625 183.5094299316406 269.0400390625 146.9297027587891 C 269.0400390625 143.3645782470703 269.43701171875 138.8120727539062 269.8572692871094 133.9923095703125 C 270.3349914550781 128.5130462646484 270.8765258789062 122.3026885986328 270.919921875 116.4871215820312 C 270.9691772460938 109.8820037841797 270.3706665039062 104.7787780761719 269.0901184082031 100.8856964111328 C 264.3561096191406 86.49334716796875 268.5174255371094 71.99800109863281 271.8611145019531 60.35076904296875 C 273.3949279785156 55.00801086425781 274.7195739746094 50.39384460449219 275.0027160644531 46.57835388183594 C 276.1148681640625 31.59173583984375 276.0570068359375 19.75897216796875 275.8125305175781 12.47146606445312 C 275.6155090332031 6.597198486328125 275.2691040039062 2.65289306640625 275.1023864746094 1 L 164.2854919433594 1 M -4.632232666015625 271.1949462890625 C -4.52471923828125 271.5497436523438 -4.39599609375 271.9498291015625 -4.250579833984375 272.3567199707031 C -3.711273193359375 273.8656005859375 -3.29376220703125 274.4922790527344 -3.079559326171875 274.7400817871094 C -2.976348876953125 274.5848693847656 -2.823211669921875 274.2996215820312 -2.645782470703125 273.7936706542969 C -2.421905517578125 273.1552734375 -2.208648681640625 272.3113708496094 -2.009246826171875 271.2760925292969 C -3.09063720703125 271.2444152832031 -3.974273681640625 271.2165222167969 -4.632232666015625 271.1949462890625 M 0 0 C 0 0 20.61083984375 4.5391845703125 55.82534790039062 6.1650390625 C 91.03968811035156 7.7908935546875 108.4317932128906 0 164.2854919433594 0 C 220.1391906738281 0 276 0 276 0 C 276 0 278.1619873046875 17.51889038085938 276 46.65234375 C 275.0741882324219 59.127197265625 263.2784118652344 80.01654052734375 270.0400390625 100.5732269287109 C 274.2761535644531 113.4516143798828 270.0400390625 135.3091583251953 270.0400390625 146.9297027587891 C 270.0400390625 217.6796875 276.9609069824219 270.14892578125 276.9609069824219 270.14892578125 C 276.9609069824219 270.14892578125 254.7412261962891 277.9912109375 185.7412261962891 277.9912109375 C 150.2062377929688 277.9912109375 99.77268981933594 268.6798706054688 64.32565307617188 270.14892578125 C 38.60868835449219 271.2147216796875 10.49295043945312 270.6268920898438 -0.8228759765625 270.3096923828125 C 0.197265625 264.0445861816406 0.96087646484375 251.5070953369141 0.96087646484375 228.0029296875 C 0.96087646484375 200.6934204101562 -5.959991455078125 135.0855407714844 -5.959991455078125 78.47508239746094 C -5.959991455078125 21.86465454101562 0 0 0 0 Z M -5.9599609375 270.14892578125 C -5.9599609375 270.14892578125 -4.0938720703125 270.2179870605469 -0.8228759765625 270.3096923828125 C -2.873504638671875 282.9034423828125 -5.9599609375 270.14892578125 -5.9599609375 270.14892578125 Z"
              stroke="none"
              fill="#707070"
            />
          </g>
        </svg>
      );
    case 2:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square2"
            data-name="Square2"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path
              d="M0,0S17.371-1.626,52.585,0s42.522,0,98.376,0H276s2.162,17.519,0,46.652c-1.523,20.518-1.039,63.352-1.039,93,0,70.75,2,130.5,2,130.5H173.341c-35.535,0-82.46,11.382-117.907,12.851C22.284,284.374,0,283,0,283s.961,15.753.961-55c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z"
              stroke="none"
            />
            <path
              d="M 23.30111694335938 0.277374267578125 C 10.56375122070312 0.277374267578125 3.0306396484375 0.767669677734375 0.7974853515625 0.938140869140625 C 0.370025634765625 2.743408203125 -0.8111572265625 8.22882080078125 -1.98699951171875 18.12661743164062 C -2.84967041015625 25.38827514648438 -3.537109375 33.55050659179688 -4.030303955078125 42.38653564453125 C -4.647186279296875 53.43904113769531 -4.959991455078125 65.58099365234375 -4.959991455078125 78.47508239746094 C -4.959991455078125 111.8493499755859 -2.52935791015625 148.7006530761719 -0.57623291015625 178.3111572265625 C 0.78515625 198.9511566162109 1.96087646484375 216.7764892578125 1.96087646484375 228.0029296875 C 1.96087646484375 263.8475341796875 1.710968017578125 277.3077087402344 1.479156494140625 282.0780639648438 C 4.666290283203125 282.236083984375 13.56741333007812 282.6106262207031 26.32876586914062 282.6106262207031 C 35.85127258300781 282.6106262207031 45.62983703613281 282.4054565429688 55.39288330078125 282.0008544921875 C 71.59750366210938 281.3292541503906 90.66104125976562 278.5124206542969 109.096923828125 275.7882995605469 C 131.1875 272.5242004394531 154.0301513671875 269.14892578125 173.3409118652344 269.14892578125 L 275.9281616210938 269.14892578125 C 275.6666564941406 260.9005126953125 273.9609069824219 204.5722503662109 273.9609069824219 139.64892578125 C 273.9609069824219 134.1120300292969 273.9442138671875 128.1739654541016 273.9265441894531 121.8871917724609 C 273.8492431640625 94.42622375488281 273.7616577148438 63.30126953125 275.0027160644531 46.57833862304688 C 276.1148681640625 31.59173583984375 276.0570068359375 19.75897216796875 275.8125305175781 12.47146606445312 C 275.6155090332031 6.597198486328125 275.2691040039062 2.652862548828125 275.1023864746094 1 L 150.9609222412109 1 C 128.6779632568359 1 114.1310729980469 1.258758544921875 102.4424285888672 1.466705322265625 C 94.72250366210938 1.60400390625 88.05531311035156 1.722625732421875 81.32899475097656 1.722625732421875 C 72.25827026367188 1.722625732421875 63.379150390625 1.499420166015625 52.53910827636719 0.998931884765625 C 42.16868591308594 0.5201416015625 32.33161926269531 0.277374267578125 23.30111694335938 0.277374267578125 M 23.30113220214844 -0.72259521484375 C 31.09201049804688 -0.72259521484375 40.84562683105469 -0.542022705078125 52.58523559570312 0 C 87.79974365234375 1.625823974609375 95.10722351074219 3.0517578125e-05 150.9609222412109 0 C 206.8146057128906 0 276 0 276 0 C 276 0 278.1619873046875 17.51889038085938 276 46.65234375 C 274.4772644042969 67.17019653320312 274.9609069824219 110.0046539306641 274.9609069824219 139.64892578125 C 274.9609069824219 210.39892578125 276.9609069824219 270.14892578125 276.9609069824219 270.14892578125 C 276.9609069824219 270.14892578125 242.3409271240234 270.14892578125 173.3409118652344 270.14892578125 C 137.8059234619141 270.14892578125 90.88107299804688 281.5309753417969 55.43431091308594 283 C 24.94422912597656 284.2636108398438 3.64666748046875 283.2028198242188 0.424407958984375 283.0244140625 C 0.6817626953125 279.1380615234375 0.96087646484375 266.1329650878906 0.96087646484375 228.0029296875 C 0.96087646484375 200.6934204101562 -5.959991455078125 135.0855407714844 -5.959991455078125 78.47508239746094 C -5.959991455078125 21.86465454101562 0 0 0 0 C 0 0 7.72222900390625 -0.72259521484375 23.30113220214844 -0.72259521484375 Z M 0 283 C 0 283 0.143218994140625 283.0088195800781 0.424407958984375 283.0244140625 C 0.204193115234375 286.3493957519531 0 283 0 283 Z"
              stroke="none"
              fill="#707070"
            />
          </g>
        </svg>
      );
    case 3:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square3"
            data-name="Square3"
            transform="translate(5.96 -1.723)"
            fill="none"
          >
            <path
              d="M0,0S17.371-1.626,52.585,0,85,6.5,140.858,6.5,276,0,276,0s2.162,17.519,0,46.652c-1.523,20.518.961,59.717.961,89.361C276.961,206.763,276,283,276,283s-32.831,3.9-101.831,3.9c-35.535,0-83.288-5.373-118.735-3.9C22.284,284.374,0,283,0,283s.961,15.753.961-55c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z"
              stroke="none"
            />
            <path
              d="M 23.30111694335938 0.277374267578125 C 10.56375122070312 0.277374267578125 3.0306396484375 0.767669677734375 0.7974853515625 0.938140869140625 C 0.370025634765625 2.743408203125 -0.8111572265625 8.22882080078125 -1.98699951171875 18.12661743164062 C -2.84967041015625 25.38827514648438 -3.537109375 33.55050659179688 -4.030303955078125 42.38653564453125 C -4.647186279296875 53.43904113769531 -4.959991455078125 65.58099365234375 -4.959991455078125 78.47508239746094 C -4.959991455078125 111.8493499755859 -2.52935791015625 148.7006530761719 -0.57623291015625 178.3111572265625 C 0.78515625 198.9511566162109 1.96087646484375 216.7764892578125 1.96087646484375 228.0029296875 C 1.96087646484375 263.8475341796875 1.710968017578125 277.3077087402344 1.479156494140625 282.0780639648438 C 4.666290283203125 282.236083984375 13.56741333007812 282.6106262207031 26.32876586914062 282.6106262207031 C 35.85127258300781 282.6106262207031 45.62983703613281 282.4054565429688 55.39288330078125 282.0008544921875 C 59.47946166992188 281.8315124511719 63.9613037109375 281.74560546875 68.71383666992188 281.74560546875 C 85.76615905761719 281.74560546875 104.8301544189453 282.8306579589844 123.2664947509766 283.8799743652344 C 141.5578460693359 284.9209899902344 158.8347778320312 285.904296875 174.1689147949219 285.904296875 C 209.7704925537109 285.904296875 235.5298767089844 284.8446044921875 250.8702239990234 283.9556579589844 C 264.4519348144531 283.1685791015625 272.4830932617188 282.3731689453125 275.0109558105469 282.103271484375 C 275.1171264648438 273.3722839355469 275.9608764648438 201.8800659179688 275.9608764648438 136.0131988525391 C 275.9608764648438 124.4938812255859 275.58203125 111.4140014648438 275.2156372070312 98.7647705078125 C 274.6257934570312 78.40003967285156 274.0686645507812 59.16465759277344 275.0027160644531 46.57833862304688 C 276.1148681640625 31.59173583984375 276.0570068359375 19.75897216796875 275.8125305175781 12.47146606445312 C 275.6184387207031 6.6839599609375 275.2793273925781 2.770050048828125 275.1099243164062 1.074981689453125 C 270.802734375 1.419281005859375 252.6338500976562 2.8426513671875 229.4346923828125 4.2498779296875 C 204.9653472900391 5.734100341796875 169.7353057861328 7.50341796875 140.8580017089844 7.50341796875 C 107.0353088378906 7.50341796875 94.501953125 5.693817138671875 82.38130187988281 3.943817138671875 C 74.53707885742188 2.81121826171875 66.42581176757812 1.64007568359375 52.53910827636719 0.998931884765625 C 42.16868591308594 0.5201416015625 32.33161926269531 0.277374267578125 23.30111694335938 0.277374267578125 M 23.30113220214844 -0.72259521484375 C 31.09201049804688 -0.72259521484375 40.84562683105469 -0.542022705078125 52.58523559570312 0 C 87.79972839355469 1.6258544921875 85.00430297851562 6.50341796875 140.8580017089844 6.50341796875 C 196.7117004394531 6.50341796875 276 0 276 0 C 276 0 278.1619873046875 17.51889038085938 276 46.65234375 C 274.4772644042969 67.17019653320312 276.9608764648438 106.3689270019531 276.9608764648438 136.0131988525391 C 276.9608764648438 206.76318359375 276 283 276 283 C 276 283 243.1689147949219 286.904296875 174.1689147949219 286.904296875 C 142.9087982177734 286.904296875 102.1887817382812 282.7456359863281 68.71383666992188 282.7456359863281 C 64.13607788085938 282.7456359863281 59.69856262207031 282.8232727050781 55.43431091308594 283 C 24.94422912597656 284.2636108398438 3.64666748046875 283.2028198242188 0.424407958984375 283.0244140625 C 0.6817626953125 279.1380615234375 0.96087646484375 266.1329650878906 0.96087646484375 228.0029296875 C 0.96087646484375 200.6934204101562 -5.959991455078125 135.0855407714844 -5.959991455078125 78.47508239746094 C -5.959991455078125 21.86465454101562 0 0 0 0 C 0 0 7.72222900390625 -0.72259521484375 23.30113220214844 -0.72259521484375 Z M 0 283 C 0 283 0.143218994140625 283.0088195800781 0.424407958984375 283.0244140625 C 0.204193115234375 286.3493957519531 0 283 0 283 Z"
              stroke="none"
              fill="#707070"
            />
          </g>
        </svg>
      );
    case 4:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square4"
            data-name="Square4"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path
              d="M0,0H52.585S287.792,14.979,282.078,3.6,278.162,17.519,276,46.652c-1.523,20.518-7.568,47.38-7.568,77.024C268.432,194.427,276,283,276,283s-33.172-5.691-102.172-5.691c-35.535,0-82.947,4.222-118.394,5.691C22.284,284.374,0,283,0,283V226.442c0-27.309-8.888-98.84-8.888-98.84Z"
              stroke="none"
            />
            <path
              d="M 0.9327392578125 1 L -7.883880615234375 127.5742645263672 C -7.704803466796875 129.0227355957031 -5.5638427734375 146.4124908447266 -3.449493408203125 166.6767272949219 C -1.419677734375 186.1310119628906 0.999969482421875 212.2915802001953 0.999969482421875 226.4418029785156 L 0.999969482421875 282.0534362792969 C 3.83843994140625 282.2004089355469 12.96206665039062 282.6106262207031 26.32879638671875 282.6106262207031 C 35.85128784179688 282.6106262207031 45.62986755371094 282.4054565429688 55.39289855957031 282.0008544921875 C 68.34779357910156 281.4639587402344 82.70420837402344 280.5713806152344 97.90351867675781 279.6263732910156 C 124.1351013183594 277.9955139160156 151.2597045898438 276.30908203125 173.8282775878906 276.30908203125 C 209.5062103271484 276.30908203125 235.4180908203125 277.8583374023438 250.8729400634766 279.1580505371094 C 263.9464721679688 280.2574768066406 271.9612426757812 281.3703308105469 274.8972778320312 281.8139953613281 C 274.4714050292969 276.6703491210938 272.8354187011719 256.4229736328125 271.2178344726562 229.9305725097656 C 269.49072265625 201.6443786621094 267.4319458007812 160.2491912841797 267.4319458007812 123.6767730712891 C 267.4319458007812 104.6863555908203 269.9024047851562 86.84381103515625 272.08203125 71.10165405273438 C 273.3019714355469 62.29061889648438 274.4542846679688 53.96827697753906 275.0027160644531 46.57835388183594 C 275.6583557128906 37.74327087402344 275.944091796875 29.4005126953125 276.1961669921875 22.03985595703125 C 276.3965759277344 16.18756103515625 276.5726928710938 11.04507446289062 276.8973693847656 7.30322265625 C 270.5864562988281 8.341796875 258.8517150878906 8.867889404296875 241.966552734375 8.867889404296875 C 207.9361724853516 8.867889404296875 158.2367858886719 6.727874755859375 122.5365600585938 4.932708740234375 C 84.41400146484375 3.015655517578125 53.71864318847656 1.073944091796875 52.55374145507812 1 L 0.9327392578125 1 M 279.8709106445312 1.962860107421875 C 279.7821350097656 2.13970947265625 279.6592102050781 2.4490966796875 279.5269775390625 2.975738525390625 C 279.403564453125 3.46734619140625 279.29150390625 4.064605712890625 279.1884460449219 4.782318115234375 C 280.5280151367188 4.41717529296875 280.9917907714844 4.099853515625 281.1402587890625 3.96343994140625 C 280.5148620605469 2.731536865234375 280.0961608886719 2.193023681640625 279.8709106445312 1.962860107421875 M -3.0517578125e-05 0 L 52.585205078125 0 C 52.585205078125 0 176.1289672851562 7.867889404296875 241.9665679931641 7.867889404296875 C 258.7115173339844 7.867889404296875 271.7218322753906 7.358856201171875 278.0198364257812 6.082275390625 C 277.1739196777344 13.93923950195312 277.2624206542969 29.64065551757812 275.9999694824219 46.65234375 C 274.4772644042969 67.17019653320312 268.4319458007812 94.03250122070312 268.4319458007812 123.6767730712891 C 268.4319458007812 194.4267730712891 275.9999694824219 283 275.9999694824219 283 C 275.9999694824219 283 242.8282928466797 277.30908203125 173.8282775878906 277.30908203125 C 138.2932891845703 277.30908203125 90.88105773925781 281.5309753417969 55.434326171875 283 C 22.28363037109375 284.3738403320312 0 283 -3.0517578125e-05 283 L -3.0517578125e-05 284.1634216308594 C -3.0517578125e-05 284.1634216308594 -3.0517578125e-05 276.9349670410156 -3.0517578125e-05 226.4418029785156 C -3.0517578125e-05 199.1323089599609 -8.88818359375 127.6013031005859 -8.88818359375 127.6013031005859 L -3.0517578125e-05 0 Z M 279.7823486328125 0.816436767578125 C 280.3721008300781 0.816436767578125 281.1195373535156 1.693695068359375 282.07763671875 3.601318359375 C 282.5973205566406 4.636016845703125 281.1271362304688 5.452423095703125 278.0198364257812 6.082275390625 C 278.3796997070312 2.73974609375 278.9085388183594 0.816436767578125 279.7823486328125 0.816436767578125 Z"
              stroke="none"
              fill="#707070"
            />
          </g>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square5"
            data-name="Square5"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path
              d="M0,0H52.585a69.833,69.833,0,0,0,20,3.181C83.229,3.181,95.154,0,95.154,0H276s2.162,17.519,0,46.652c-1.523,20.518-7.568,47.38-7.568,77.024C268.432,194.427,276,283,276,283s-33.172-5.691-102.172-5.691c-35.535,0-82.947,4.222-118.394,5.691C22.284,284.374,0,283,0,283V226.442c0-27.309,7.342-106.174,7.342-106.174Z"
              stroke="none"
            />
            <path
              d="M 1.06292724609375 1 L 8.344940185546875 120.2835388183594 L 8.337799072265625 120.3602600097656 C 8.3194580078125 120.557373046875 6.481719970703125 140.336181640625 4.667724609375 163.195068359375 C 2.994537353515625 184.2796936035156 1 212.3677215576172 1 226.4418029785156 L 1 282.0534362792969 C 3.83843994140625 282.2003784179688 12.9620361328125 282.610595703125 26.32876586914062 282.610595703125 C 35.85130310058594 282.610595703125 45.6298828125 282.4054565429688 55.39291381835938 282.0008544921875 C 68.34780883789062 281.4639587402344 82.7042236328125 280.5713806152344 97.90353393554688 279.6263732910156 C 124.1351165771484 277.9954833984375 151.2597351074219 276.30908203125 173.8283081054688 276.30908203125 C 209.5062255859375 276.30908203125 235.4181060791016 277.8583374023438 250.8729553222656 279.1580200195312 C 263.9464721679688 280.2574768066406 271.9612731933594 281.3703002929688 274.8973083496094 281.8139953613281 C 274.471435546875 276.6703491210938 272.8354187011719 256.4229736328125 271.2178344726562 229.9305725097656 C 269.49072265625 201.6443786621094 267.4319458007812 160.2491912841797 267.4319458007812 123.6767578125 C 267.4319458007812 104.6863403320312 269.9024047851562 86.84379577636719 272.08203125 71.10165405273438 C 273.302001953125 62.29060363769531 274.4543151855469 53.96826171875 275.0027160644531 46.57833862304688 C 276.1148681640625 31.59173583984375 276.0570068359375 19.75894165039062 275.8125305175781 12.47146606445312 C 275.6155090332031 6.597198486328125 275.2691040039062 2.652862548828125 275.1023864746094 1 L 95.28330993652344 1 C 94.66062927246094 1.1619873046875 91.89569091796875 1.863311767578125 88.04292297363281 2.574005126953125 C 84.06814575195312 3.307159423828125 78.16018676757812 4.18115234375 72.58714294433594 4.18115234375 C 67.00119018554688 4.18115234375 61.77999877929688 3.3038330078125 58.38357543945312 2.56787109375 C 55.19830322265625 1.877685546875 53.01873779296875 1.19390869140625 52.42399597167969 1 L 1.06292724609375 1 M 0 0 L 52.58522033691406 0 C 52.58522033691406 0 61.94491577148438 3.18115234375 72.58714294433594 3.18115234375 C 83.22941589355469 3.18115234375 95.15422058105469 0 95.15422058105469 0 L 276 0 C 276 0 278.1619873046875 17.51889038085938 276 46.65234375 C 274.4772644042969 67.17018127441406 268.4319458007812 94.03250122070312 268.4319458007812 123.6767578125 C 268.4319458007812 194.4267578125 276 283 276 283 C 276 283 242.8283081054688 277.30908203125 173.8283081054688 277.30908203125 C 138.2933044433594 277.30908203125 90.88107299804688 281.5309448242188 55.43434143066406 283 C 22.28352355957031 284.3738708496094 0 283 0 283 L 0 284.1633911132812 C 0 284.1633911132812 0 276.9349670410156 0 226.4418029785156 C 0 199.1323394775391 7.34210205078125 120.267578125 7.34210205078125 120.267578125 L 0 0 Z"
              stroke="none"
              fill="#707070"
            />
          </g>
        </svg>
      );
  }
};
