import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

/** A list item with a stable identity used as the `repeat()` key. */
export interface DemoItem {
  id: string;
  label: string;
}

/**
 * Side-by-side demo of Lit list rendering with `Array.map()` versus keyed
 * `repeat()`. Type into the inputs, then shuffle or reverse the list: map
 * reuses DOM nodes by index (values stick to positions), while repeat moves
 * nodes with their item ids (values stay with the item).
 */
@customElement('repeat-vs-map')
export class RepeatVsMap extends LitElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: min(960px, 100%);
      margin: 0 auto;
      padding: 1.5rem;
      font: 16px/1.45 system-ui, 'Segoe UI', Roboto, sans-serif;
      color: #1f2937;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    h1 {
      margin: 0 0 0.5rem;
      font-size: 1.75rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .lede {
      margin: 0 0 1.25rem;
      max-width: 52rem;
      color: #4b5563;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }

    button {
      font: inherit;
      cursor: pointer;
      padding: 0.4rem 0.85rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #f9fafb;
      color: inherit;
    }

    button:hover {
      background: #f3f4f6;
    }

    button:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    .panels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 720px) {
      .panels {
        grid-template-columns: 1fr;
      }
    }

    section {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1rem;
      background: #fff;
    }

    section h2 {
      margin: 0 0 0.35rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .hint {
      margin: 0 0 0.85rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    li {
      display: grid;
      grid-template-columns: 4.5rem 1fr;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.65rem;
      border-radius: 0.375rem;
      background: #f3f4f6;
    }

    .label {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    input {
      font: inherit;
      width: 100%;
      padding: 0.35rem 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      background: #fff;
    }

    input:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 1px;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        color: #e5e7eb;
      }

      .lede,
      .hint {
        color: #9ca3af;
      }

      button {
        background: #1f2937;
        border-color: #374151;
        color: #e5e7eb;
      }

      button:hover {
        background: #111827;
      }

      section {
        background: #111827;
        border-color: #374151;
      }

      li {
        background: #1f2937;
      }

      input {
        background: #0b1220;
        border-color: #374151;
        color: #e5e7eb;
      }
    }
  `;

  @state()
  private _items: DemoItem[] = [
    { id: 'a', label: 'Item A' },
    { id: 'b', label: 'Item B' },
    { id: 'c', label: 'Item C' },
    { id: 'd', label: 'Item D' },
  ];

  private _nextId = 5;

  /**
   * Renders the demo chrome, shared controls, and the two list panels.
   */
  protected override render(): TemplateResult {
    return html`
      <h1>map() vs repeat()</h1>
      <p class="lede">
        Type different text into each input, then shuffle or reverse. With
        <code>map()</code>, Lit reuses DOM by position, so typed values stay in
        place. With keyed <code>repeat()</code>, nodes move with their item
        <code>id</code>, so values travel with the row.
      </p>

      <div class="controls">
        <button type="button" @click=${this._shuffle}>Shuffle</button>
        <button type="button" @click=${this._reverse}>Reverse</button>
        <button type="button" @click=${this._addItem}>Add item</button>
        <button type="button" @click=${this._removeFirst}>Remove first</button>
      </div>

      <div class="panels">
        <section aria-labelledby="map-heading">
          <h2 id="map-heading">Array.map()</h2>
          <p class="hint">Keyed by index — DOM nodes stick to list positions.</p>
          <ul>
            ${this._renderMapList()}
          </ul>
        </section>

        <section aria-labelledby="repeat-heading">
          <h2 id="repeat-heading">repeat() with keys</h2>
          <p class="hint">Keyed by <code>id</code> — DOM nodes move with items.</p>
          <ul>
            ${this._renderRepeatList()}
          </ul>
        </section>
      </div>
    `;
  }

  /**
   * Renders the list with `Array.map()`, which associates templates with
   * array indexes rather than stable item identities.
   */
  private _renderMapList(): TemplateResult[] {
    return this._items.map(
      (item) => html`
        <li>
          <span class="label">${item.label}</span>
          <input
            type="text"
            placeholder="Type here…"
            aria-label="Note for ${item.label} (map list)"
          />
        </li>
      `
    );
  }

  /**
   * Renders the list with Lit's keyed `repeat()` so each item keeps the same
   * DOM node across reorder, insert, and remove operations.
   */
  private _renderRepeatList(): TemplateResult {
    return html`${repeat(
      this._items,
      (item) => item.id,
      (item) => html`
        <li>
          <span class="label">${item.label}</span>
          <input
            type="text"
            placeholder="Type here…"
            aria-label="Note for ${item.label} (repeat list)"
          />
        </li>
      `
    )}`;
  }

  /**
   * Randomizes item order with a Fisher–Yates shuffle and reassigns `_items`
   * so Lit schedules an update.
   */
  private _shuffle(): void {
    const next = [...this._items];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = next[i]!;
      next[i] = next[j]!;
      next[j] = tmp;
    }
    this._items = next;
  }

  /**
   * Reverses the current item order and reassigns `_items` to trigger render.
   */
  private _reverse(): void {
    this._items = [...this._items].reverse();
  }

  /**
   * Appends a new uniquely identified item to the end of the list.
   */
  private _addItem(): void {
    const id = String(this._nextId++);
    this._items = [
      ...this._items,
      { id, label: `Item ${id.toUpperCase()}` },
    ];
  }

  /**
   * Removes the first item when the list is non-empty.
   */
  private _removeFirst(): void {
    if (this._items.length === 0) {
      return;
    }
    this._items = this._items.slice(1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'repeat-vs-map': RepeatVsMap;
  }
}
