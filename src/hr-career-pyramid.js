import { LitElement, html, css } from 'lit';

class HrCareerPyramid extends LitElement {
  static properties = {
    _selectedColumn: { type: Number, state: true },
  };

  constructor() {
    super();
    this._selectedColumn = -1;
  }

  get _columns() {
    return ['C&B', 'TA', 'HRBP', 'HR GENERAL', 'OD', 'L&D'];
  }

  get _branchRows() {
    return [
      ['C&B MANAGER', 'TA MANAGER', '', '', '', 'L&D MANAGER'],
      ['', '', 'HRBP SUPEVISOR', 'HRM', 'OD MANAGER', 'L&D SUPEVISOR'],
      ['C&B SUPEVISOR', 'TA SUPEVISOR', '', 'HR GEN SUPEVISOR', 'OD SUPEVISOR', ''],
      ['C&B SPECIALIST', 'TA SPECIALIST', 'HRBP SPECIALIST', 'HR GEN SPECIALIST', 'OD SPECIALIST', 'L&D SPECIALIST'],
      ['PAYROLL', 'RECRUIMENT', '', 'HR EXECUTIVE', '', 'TRAINING'],
    ];
  }

  // Linear interpolation: row 0 (tip) = 8%, row 7 (base) = 100%
  _rowWidth(index) {
    const min = 8;
    return min + (100 - min) * (index / 7);
  }

  // Branch rows get progressively taller (in cqw units)
  _branchRowHeight(rowIndex) {
    const min = 4.2;
    const max = 6;
    return min + (max - min) * (rowIndex / 4);
  }

  _handleBranchClick(colIndex) {
    this._selectedColumn = this._selectedColumn === colIndex ? -1 : colIndex;
  }

  _isHighlighted(colIndex) {
    return this._selectedColumn === colIndex;
  }

  _renderSharedRow(index, label, className) {
    const width = `${this._rowWidth(index)}%`;
    return html`
      <div
        class="shared-row ${className}"
        style="width: ${width}"
      >
        <span class="cell-text">${label}</span>
      </div>
    `;
  }

  _renderBranchRow(cells, rowIndex) {
    const width = `${this._rowWidth(rowIndex + 3)}%`;
    const h = this._branchRowHeight(rowIndex);
    return html`
      <div class="branch-row" style="width: ${width}; min-height: clamp(28px, ${h}cqw, 52px)">
        ${cells.map((cell, colIndex) => {
          const isEmpty = !cell;
          const highlighted = this._isHighlighted(colIndex);
          return html`
            <div
              class="cell ${isEmpty ? 'empty' : 'filled'} ${highlighted && !isEmpty ? 'highlighted' : ''}"
              @click=${isEmpty ? null : () => this._handleBranchClick(colIndex)}
            >
              ${isEmpty ? '' : html`<span class="cell-text">${cell}</span>`}
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    return html`
      <div class="pyramid-container">
        <!-- Shared top rows -->
        <div class="shared-rows">
          ${this._renderSharedRow(0, 'CHRO', 'chro')}
          ${this._renderSharedRow(1, 'HRD', 'hrd')}
          ${this._renderSharedRow(2, 'HRBP MANAGER', 'hrbp-mgr')}
        </div>

        <!-- Branch rows -->
        <div class="branch-rows">
          ${this._branchRows.map((row, i) => this._renderBranchRow(row, i))}
        </div>

        <!-- Column labels -->
        <div class="column-labels" style="width: 100%">
          ${this._columns.map(
            (col, i) => html`
              <div class="col-label ${this._isHighlighted(i) ? 'highlighted' : ''}">
                ${col}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', Arial, sans-serif;
      user-select: none;
      width: 100%;
      container-type: inline-size;
    }

    .pyramid-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(2px, 0.35cqw, 4px);
      position: relative;
    }

    /* ---- Shared rows (top 3) ---- */
    .shared-rows {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(2px, 0.3cqw, 4px);
      width: 100%;
      position: relative;
    }

    .shared-row {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: opacity 0.3s ease;
    }

    /* CHRO - gold trapezoid */
    .chro {
      height: clamp(28px, 4.5cqw, 48px);
      background: #f8ca11;
      color: #000;
      font-size: clamp(9px, 1.6cqw, 15px);
      clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
    }

    /* HRD - dark olive-gold with border */
    .hrd {
      height: clamp(24px, 3.8cqw, 38px);
      background: #ffc751;
      color: #000;
      font-size: clamp(8px, 1.4cqw, 13px);
      border-radius: 4px;
      border: 1.5px solid #8a7332;
    }

    /* HRBP Manager - cream/tan with border */
    .hrbp-mgr {
      height: clamp(24px, 3.8cqw, 38px);
      background: #fee0a0;
      color: #000;
      font-size: clamp(8px, 1.3cqw, 12px);
      font-weight: 800;
      border-radius: 4px;
      border: 1.5px solid #c4a84a;
    }

    /* ---- Branch rows ---- */
    .branch-rows {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(2px, 0.35cqw, 4px);
      width: 100%;
      position: relative;
    }

    .branch-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: clamp(2px, 0.3cqw, 4px);
    }

    .cell {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      font-size: clamp(6px, 1.1cqw, 11px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      transition: all 0.3s ease;
      line-height: 1.2;
    }

    .cell.filled {
      background: #2C271E;
      color: #fff;
      cursor: pointer;
      border: 1px solid #4a4530;
    }

    .cell.filled:hover {
      background: #4a4530;
    }

    .cell.empty {
      background: #2C271E;
      cursor: default;
      pointer-events: none;
      border: 1px solid #4a4530;
    }

    .cell.highlighted {
      background: #e8b30e !important;
      color: #000 !important;
      border-color: #f5c518 !important;
      box-shadow: 0 0 10px 2px rgba(232, 179, 14, 0.4);
    }

    .cell-text {
      padding: 2px 4px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ---- Column labels ---- */
    .column-labels {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: clamp(2px, 0.3cqw, 4px);
      margin-top: clamp(2px, 0.5cqw, 6px);
      position: relative;
    }

    .col-label {
      text-align: center;
      color: #7a7060;
      font-size: clamp(7px, 1.1cqw, 12px);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: clamp(2px, 0.4cqw, 5px) 0;
      transition: color 0.3s ease;
    }

    .col-label.highlighted {
      color: #e8b30e;
    }

    /* ---- Mobile: flat grid layout ---- */
    @container (max-width: 480px) {
      .shared-row {
        width: 100% !important;
        clip-path: none !important;
        border-radius: 4px;
      }

      .branch-row {
        width: 100% !important;
        min-height: 32px !important;
      }
    }
  `;
}

customElements.define('hr-career-pyramid', HrCareerPyramid);
