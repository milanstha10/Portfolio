import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Edit3, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import type { z } from "zod";

import {
  createRecord,
  deleteRecord,
  fetchSingleton,
  listRecords,
  saveSingletonRecord,
  updateRecord,
} from "@/lib/portfolio/portfolio.api";

import {
  COLLECTIONS,
  PROFILE_FIELDS,
  SETTINGS_FIELDS,
  SINGLETONS,
  type FieldDef,
} from "@/lib/portfolio/portfolio.schema";

import { idOf, text, type Rec } from "@/lib/portfolio/portfolio.content";

import type { CollectionKey } from "./types";
import { PageHeader } from "./AdminDashboard";

function getValidationMessage(error: unknown): string {
  if (error && typeof error === "object" && "issues" in error) {
    const zodError = error as z.ZodError;

    const firstIssue = zodError.issues[0];

    if (firstIssue?.message) {
      return firstIssue.message;
    }
  }

  return error instanceof Error
    ? error.message
    : "Please check the form fields.";
}

export function SingletonEditor({
  title,
  description,
  apiKey,
  fields,
}: {
  title: string;
  description: string;
  apiKey: "profile" | "siteSettings";
  fields: FieldDef[];
}) {
  const getSingleton = useServerFn(fetchSingleton);
  const saveSingleton = useServerFn(saveSingletonRecord);

  const [pending, setPending] = useState(false);

  const schema = SINGLETONS[apiKey].schema;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["singleton", apiKey],
    queryFn: async () => {
      const result = await getSingleton({
        data: {
          key: apiKey,
        },
      });

      return result.record as Rec | null;
    },
  });

  async function save(values: Rec) {
    setPending(true);

    try {
      await saveSingleton({
        data: {
          key: apiKey,
          values,
        },
      });

      toast.success(`${title} saved`);

      await refetch();
    } catch (error) {
      toast.error(`Could not save ${title}`, {
        description: getValidationMessage(error),
      });
    } finally {
      setPending(false);
    }
  }

  if (isLoading) {
    return <LoadingMessage message={`Loading ${title.toLowerCase()}...`} />;
  }

  if (isError) {
    return (
      <EditorError
        message={`Could not load ${title.toLowerCase()}.`}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <section>
      <PageHeader title={title} description={description} />

      <RecordForm
        title={`Edit ${title}`}
        fields={fields}
        schema={schema}
        initialValues={data ?? {}}
        pending={pending}
        onCancel={() => undefined}
        onSave={save}
      />
    </section>
  );
}

export function CollectionEditor({
  collectionKey,
}: {
  collectionKey: CollectionKey;
}) {
  const config = COLLECTIONS[collectionKey];

  const getRecords = useServerFn(listRecords);
  const doCreate = useServerFn(createRecord);
  const doUpdate = useServerFn(updateRecord);
  const doDelete = useServerFn(deleteRecord);

  const [editing, setEditing] = useState<Rec | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, setPending] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["records", collectionKey],
    queryFn: async () => {
      const result = await getRecords({
        data: {
          key: collectionKey,
        },
      });

      return result.records as Rec[];
    },
  });

  async function save(values: Rec) {
    setPending(true);

    try {
      if (editing) {
        await doUpdate({
          data: {
            key: collectionKey,
            id: idOf(editing),
            values,
          },
        });

        toast.success("Record updated");
      } else {
        await doCreate({
          data: {
            key: collectionKey,
            values,
          },
        });

        toast.success("Record created");
      }

      setEditing(null);
      setCreating(false);

      await refetch();
    } catch (error) {
      toast.error("Could not save record", {
        description: getValidationMessage(error),
      });
    } finally {
      setPending(false);
    }
  }

  async function remove(record: Rec) {
    if (pending) {
      return;
    }

    if (!window.confirm("Delete this record permanently?")) {
      return;
    }

    setPending(true);

    try {
      await doDelete({
        data: {
          key: collectionKey,
          id: idOf(record),
        },
      });

      toast.success("Record deleted");

      await refetch();
    } catch (error) {
      toast.error("Could not delete record", {
        description: getValidationMessage(error),
      });
    } finally {
      setPending(false);
    }
  }

  function closeEditor() {
    if (pending) {
      return;
    }

    setEditing(null);
    setCreating(false);
  }

  return (
    <section>
      <PageHeader
        title={config.label}
        description={`Manage ${config.label.toLowerCase()} stored in MongoDB.`}
      />

      {creating || editing ? (
        <RecordForm
          title={
            editing ? `Edit ${config.singular}` : `Create ${config.singular}`
          }
          fields={config.fields}
          schema={config.schema}
          initialValues={editing ?? {}}
          pending={pending}
          onCancel={closeEditor}
          onSave={save}
        />
      ) : (
        <>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setCreating(true)}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-60"
            >
              <Plus className="size-4" />
              Add {config.singular}
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : isError ? (
              <EditorError
                message={`Could not load ${config.label.toLowerCase()}.`}
                onRetry={() => refetch()}
              />
            ) : data && data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-surface-light/40">
                    <tr>
                      {config.fields
                        .filter((field) => field.column)
                        .map((field) => (
                          <th
                            key={field.name}
                            scope="col"
                            className="whitespace-nowrap px-4 py-3 text-left font-medium"
                          >
                            {field.label}
                          </th>
                        ))}

                      <th
                        scope="col"
                        className="px-4 py-3 text-right font-medium"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((record) => (
                      <tr
                        key={idOf(record)}
                        className="border-b border-border last:border-0"
                      >
                        {config.fields
                          .filter((field) => field.column)
                          .map((field) => (
                            <td key={field.name} className="max-w-xs px-4 py-3">
                              <CellValue
                                value={record[field.name]}
                                field={field}
                              />
                            </td>
                          ))}

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditing(record)}
                              disabled={pending}
                              className="rounded-lg border border-border p-2 transition-colors hover:bg-surface-light disabled:opacity-50"
                              title="Edit"
                              aria-label={`Edit ${config.singular}`}
                            >
                              <Edit3 className="size-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => remove(record)}
                              disabled={pending}
                              className="rounded-lg border border-destructive/20 p-2 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                              title="Delete"
                              aria-label={`Delete ${config.singular}`}
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="font-medium">No records yet</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Click "Add {config.singular}" to create your first record.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export function RecordForm({
  title,
  fields,
  schema,
  initialValues,
  pending,
  onCancel,
  onSave,
}: {
  title: string;
  fields: FieldDef[];
  schema: z.ZodTypeAny;
  initialValues: Rec;
  pending: boolean;
  onCancel: () => void;
  onSave: (values: Rec) => void;
}) {
  const [values, setValues] = useState<Rec>(() => {
    const result: Rec = {};

    for (const field of fields) {
      const fieldName = field.name;

      if (!fieldName) {
        continue;
      }

      const current = initialValues[fieldName];

      if (field.type === "tags") {
        result[fieldName] = Array.isArray(current) ? current : [];
      } else if (field.type === "switch") {
        result[fieldName] = Boolean(current);
      } else {
        result[fieldName] = current ?? "";
      }
    }

    return result;
  });

  function update(name: string, value: unknown) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) {
      return;
    }

    const prepared: Rec = {
      ...values,
    };

    for (const field of fields) {
      const fieldName = field.name;

      if (!fieldName) {
        continue;
      }

      if (field.type === "tags" && typeof prepared[fieldName] === "string") {
        prepared[fieldName] = String(prepared[fieldName])
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      if (field.type === "number" && prepared[fieldName] !== "") {
        prepared[fieldName] = Number(prepared[fieldName]);
      }

      if (field.type === "number" && prepared[fieldName] === "") {
        delete prepared[fieldName];
      }
    }

    const result = schema.safeParse(prepared);

    if (!result.success) {
      const firstIssue = result.error.issues[0];

      toast.error("Please fix the form", {
        description: firstIssue?.message ?? "One or more fields are invalid.",
      });

      return;
    }

    onSave(result.data as Rec);
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-surface-light/20 p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Changes are validated and saved to MongoDB.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="rounded-lg border border-border p-2 transition-colors hover:bg-surface-light disabled:opacity-50"
          aria-label="Close editor"
        >
          <X className="size-4" />
        </button>
      </div>

      <form className="mt-7 space-y-5" onSubmit={submit}>
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => {
            if (!field.name) {
              return null;
            }

            return (
              <FieldInput
                key={field.name}
                field={field}
                value={values[field.name]}
                disabled={pending}
                onChange={(value) => update(field.name, value)}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:bg-surface-light disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}

            {pending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FieldInput({
  field,
  value,
  disabled,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  disabled: boolean;
  onChange: (value: unknown) => void;
}) {
  const inputId = `field-${field.name}`;

  const stringValue =
    typeof value === "string" || typeof value === "number" ? String(value) : "";

  if (field.type === "switch") {
    return (
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4"
      >
        <input
          id={inputId}
          type="checkbox"
          checked={Boolean(value)}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-primary"
        />

        <span>
          <span className="block text-sm font-medium">{field.label}</span>

          {field.help && (
            <span className="mt-1 block text-xs text-muted-foreground">
              {field.help}
            </span>
          )}
        </span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label htmlFor={inputId} className="block">
        <span className="text-sm font-medium">{field.label}</span>

        <select
          id={inputId}
          value={stringValue}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
        >
          <option value="">Select...</option>

          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {field.help && (
          <span className="mt-1 block text-xs text-muted-foreground">
            {field.help}
          </span>
        )}
      </label>
    );
  }

  if (field.type === "tags") {
    const arrayValue = Array.isArray(value) ? value : [];

    return (
      <label htmlFor={inputId} className="block md:col-span-2">
        <span className="text-sm font-medium">{field.label}</span>

        <input
          id={inputId}
          type="text"
          value={arrayValue.join(", ")}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
          placeholder="React, TypeScript, MongoDB"
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
        />

        <span className="mt-1 block text-xs text-muted-foreground">
          Separate items with commas.
          {field.help ? ` ${field.help}` : ""}
        </span>
      </label>
    );
  }

  const isLarge = field.type === "textarea" || field.type === "richtext";

  return (
    <label
      htmlFor={inputId}
      className={isLarge ? "block md:col-span-2" : "block"}
    >
      <span className="text-sm font-medium">{field.label}</span>

      {isLarge ? (
        <textarea
          id={inputId}
          value={stringValue}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          rows={6}
          className="mt-1.5 w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
        />
      ) : (
        <input
          id={inputId}
          type={
            field.type === "url"
              ? "url"
              : field.type === "number"
                ? "number"
                : field.type === "date"
                  ? "date"
                  : "text"
          }
          value={stringValue}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
        />
      )}

      {field.help && (
        <span className="mt-1 block text-xs text-muted-foreground">
          {field.help}
        </span>
      )}
    </label>
  );
}

function CellValue({ value, field }: { value: unknown; field: FieldDef }) {
  if (field.type === "switch") {
    return value ? (
      <span className="inline-flex items-center gap-1 text-green-600">
        <Check className="size-3.5" />
        Yes
      </span>
    ) : (
      <span className="text-muted-foreground">No</span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex max-w-sm flex-wrap gap-1">
        {value.slice(0, 5).map((item, index) => (
          <span
            key={`${String(item)}-${index}`}
            className="rounded-md border border-border bg-surface-light px-2 py-0.5 text-xs"
          >
            {String(item)}
          </span>
        ))}

        {value.length > 5 && (
          <span className="text-xs text-muted-foreground">
            +{value.length - 5}
          </span>
        )}
      </div>
    );
  }

  const result = text(value);

  return (
    <span className="block max-w-xs truncate" title={result}>
      {result || <span className="text-muted-foreground">—</span>}
    </span>
  );
}

function LoadingMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      {message}
    </div>
  );
}

function EditorError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
      <p className="text-sm font-medium">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-surface-light"
      >
        Try again
      </button>
    </div>
  );
}
