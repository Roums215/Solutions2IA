/**
 * Server-side JSON-LD injection.
 * Usage : <JsonLd schema={buildOrganizationSchema()} />
 * Ou via combineSchemas() pour grouper plusieurs schemas dans un seul <script>.
 */

type JsonLdSchema = Record<string, unknown>;

export function JsonLd({ schema, id }: { schema: JsonLdSchema; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
