import React, {useRef} from "react";
import convertToEmbedURL from "@/utils/convertToEmbedUrl";
import extractTimeStampFromUrl from "@/utils/extractTSfromURL";
import Carousel from 'react-bootstrap/Carousel';
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface ContextSource {
  content: string;
  sourceNum: number;
  metadata_json: Record<string, string>
}

export function SourcesSidebar({contextSource, activeVideo, setActiveVideo}: {
  contextSource: ContextSource[],
  activeVideo: undefined | number,
  setActiveVideo: (value: undefined | number) => void
}) {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const colors = ["bg-dmauve-300", "bg-dpink-400", "bg-dblue-100", "bg-dorange-400", "bg-dgreen-500"]

  // Assuming a fixed size for simplicity. Adjust as necessary.

  return (
    <>
      <Carousel className="w-4/5 flex flex-col" activeIndex={activeVideo} controls={true} indicators={true}
                interval={null} fade={false} onSelect={(selectedIndex: number) => setActiveVideo(selectedIndex)}>
        {contextSource.map((context, index) => (
          <Carousel.Item className="" key={context.sourceNum}>
            <div className={`${colors[(index) % colors.length]} grid grid-cols-2 m-4 py-4 px-14 rounded-2xl`}>
              <div className="col-span-2 justify-center">
                <h1
                  className="text-lg font-bold">{`Source ${context.sourceNum}: ${context.metadata_json?.file_name}`}</h1>
                <div className="flex items-center">
                  <div>

                <Markdown
                  components={{
                    br: ({node, ...props}) => {
                      return <span><br/><br/></span>;
                    }
                  }}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}>{context.content}</Markdown>
                <a
                  className="text-sm" href={context.metadata_json.url}>{context.metadata_json.url}</a>
              </div>
                  </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
