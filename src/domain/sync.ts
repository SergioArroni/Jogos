// Incremental sync: compare what is in the cloud (a snapshot taken at the last
// load or save) with the current rows, and only send what changed.

export type Snapshot = Map<string, string>;

export const snapshotOf = <T extends { id: string }>(rows: T[]): Snapshot =>
  new Map(rows.map(row => [row.id, JSON.stringify(row)]));

export interface RowDiff<T> {
  removed: string[];
  changed: T[];
  current: Snapshot;
}

export function diffRows<T extends { id: string }>(before: Snapshot, rows: T[]): RowDiff<T> {
  const current = snapshotOf(rows);
  return {
    removed: [...before.keys()].filter(id => !current.has(id)),
    changed: rows.filter(row => before.get(row.id) !== current.get(row.id)),
    current,
  };
}
