import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mdm/ui";
import { RichText } from "@payloadcms/richtext-lexical/react";

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
          <AccordionContent className="text-gray-700">
            <RichText data={item.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
