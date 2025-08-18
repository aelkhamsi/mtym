import { Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@mdm/ui";

type FaqItem = {
  question: string;

  anwser: string;
}

export const FaqAccordion = ({
  items,
}:{
  items: FaqItem[]
}) => {
  return (
    <Accordion 
      type="single" 
      collapsible 
      className="animate-fade-up opacity-0"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {items.map((item, index) => 
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-gray-700 whitespace-pre-line">
            {item.anwser}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}
