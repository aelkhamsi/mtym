import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { formatDate, timeAgo } from "@mdm/utils";

interface Email {
  subject: string;
  content: string;
  sentAt: string;
}

interface EmailHistoryProps {
  emails: Email[];
}

export function EmailHistory({ emails }: EmailHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const sorted = [...(emails ?? [])].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [sorted.length]);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Mail className="mb-2 h-8 w-8" />
        <p className="text-sm">No emails sent yet</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[525px] flex-col gap-4 overflow-y-auto pr-2">
      {sorted.map((email, index) => (
        <div key={index} className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground shadow-sm">
            <div className="text-sm font-semibold">{email.subject}</div>

            <div className="mt-1 whitespace-pre-wrap text-sm opacity-90">
              {email.content}
            </div>

            <div className="mt-2 text-right text-xs opacity-70">
              {formatDate(email.sentAt)} · {timeAgo(email.sentAt)}
            </div>
          </div>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}