import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mail, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  deleteRecord,
  listRecords,
  updateRecord,
} from "@/lib/portfolio/api.functions";

import { idOf, text, type Rec } from "@/lib/portfolio/content";

import { PageHeader } from "./Dashboard";

export function Messages() {
  const getRecords = useServerFn(listRecords);
  const doUpdate = useServerFn(updateRecord);
  const doDelete = useServerFn(deleteRecord);

  const [pending, setPending] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["records", "messages"],
    queryFn: async () => {
      const result = await getRecords({
        data: {
          key: "messages",
        },
      });

      return result.records as Rec[];
    },
  });

  async function markStatus(record: Rec, status: "read" | "unread") {
    setPending(true);

    try {
      await doUpdate({
        data: {
          key: "messages",
          id: idOf(record),
          values: {
            status,
          },
        },
      });

      await refetch();

      toast.success(status === "read" ? "Marked as read" : "Marked as unread");
    } catch {
      toast.error("Could not update message");
    } finally {
      setPending(false);
    }
  }

  async function remove(record: Rec) {
    if (!window.confirm("Delete this message permanently?")) {
      return;
    }

    setPending(true);

    try {
      await doDelete({
        data: {
          key: "messages",
          id: idOf(record),
        },
      });

      await refetch();

      toast.success("Message deleted");
    } catch {
      toast.error("Could not delete message");
    } finally {
      setPending(false);
    }
  }

  return (
    <section>
      <PageHeader
        title="Messages"
        description="Messages submitted through your portfolio contact form."
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : !data?.length ? (
          <div className="p-12 text-center">
            <Mail className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 font-medium">No messages yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data.map((message) => {
              const unread = text(message["status"]) === "unread";
              return (
                <article
                  key={idOf(message)}
                  className={`p-5 ${unread ? "bg-primary/5" : ""}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                          {text(message["subject"], "No subject")}
                        </h3>

                        {unread && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                            UNREAD
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {text(message["name"])} · {text(message["email"])}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          markStatus(message, unread ? "read" : "unread")
                        }
                        className="rounded-lg border border-border px-3 py-2 text-xs hover:bg-surface-light"
                      >
                        {unread ? "Mark read" : "Mark unread"}
                      </button>

                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => remove(message)}
                        className="rounded-lg border border-destructive/20 p-2 text-destructive hover:bg-destructive/10"
                        aria-label="Delete message"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {text(message["message"])}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
