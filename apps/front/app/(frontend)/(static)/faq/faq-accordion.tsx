import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mdm/ui";
import { ColoredRichText } from "@/app/components/rich-text/colored-rich-text";

type FaqItem = {
  id: string;
  question: string;
  answer: any;
}

export const FaqAccordion = ({
  items,
}: {
  items: FaqItem[];
}) => {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem key={item.id} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <ColoredRichText
              data={item.answer}
              className="prose prose-sm max-w-none text-gray-700 [&_p]:my-0 [&>*+*]:mt-2 [&_strong]:text-inherit [&_em]:text-inherit [&_code]:text-inherit"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
