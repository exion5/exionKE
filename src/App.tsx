import { useState } from 'react'
import './App.css'

const LAYOUT = [
  [
    {l:'1',c:'KC_1'},{l:'2',c:'KC_2'},{l:'3',c:'KC_3'},{l:'4',c:'KC_4'},
    {l:'5',c:'KC_5'},{l:'6',c:'KC_6'},{l:'7',c:'KC_7'},{l:'8',c:'KC_8'},{l:'9',c:'KC_9'},
    {l:'0',c:'KC_0'},{l:'-',c:'KC_MINS'},{l:'=',c:'KC_EQL'},
    {l:'Bksp',c:'KC_BSPC',w:'w200'},{l:'`',c:'KC_GRV'},
  ],
  [
    {l:'Tab',c:'KC_TAB',w:'w150'},{l:'Q',c:'KC_Q'},{l:'W',c:'KC_W'},{l:'E',c:'KC_E'},
    {l:'R',c:'KC_R'},{l:'T',c:'KC_T'},{l:'Y',c:'KC_Y'},{l:'U',c:'KC_U'},{l:'I',c:'KC_I'},
    {l:'O',c:'KC_O'},{l:'P',c:'KC_P'},{l:'[',c:'KC_LBRC'},{l:']',c:'KC_RBRC'},
    {l:'\\',c:'KC_BSLS',w:'w150'},{l:'Del',c:'KC_DEL'},
  ],
  [
    {l:'Caps',c:'KC_CAPS',w:'w175'},{l:'A',c:'KC_A'},{l:'S',c:'KC_S'},{l:'D',c:'KC_D'},
    {l:'F',c:'KC_F'},{l:'G',c:'KC_G'},{l:'H',c:'KC_H'},{l:'J',c:'KC_J'},{l:'K',c:'KC_K'},
    {l:'L',c:'KC_L'},{l:';',c:'KC_SCLN'},{l:"'",c:'KC_QUOT'},{l:'Enter',c:'KC_ENT',w:'w225'},{l:'PgU',c:'KC_PGUP'},
  ],
  [
    {l:'Shift',c:'KC_LSFT',w:'w225'},{l:'Z',c:'KC_Z'},{l:'X',c:'KC_X'},{l:'C',c:'KC_C'},
    {l:'V',c:'KC_V'},{l:'B',c:'KC_B'},{l:'N',c:'KC_N'},{l:'M',c:'KC_M'},
    {l:',',c:'KC_COMM'},{l:'.',c:'KC_DOT'},{l:'/',c:'KC_SLSH'},
    {l:'Shift',c:'KC_RSFT',w:'w175'},{l:'↑',c:'KC_UP'},{l:'PgD',c:'KC_PGDN'},
  ],
  [
    {l:'Ctrl',c:'KC_LCTL',w:'w125'},{l:'Win',c:'KC_LGUI',w:'w125'},{l:'Alt',c:'KC_LALT',w:'w125'},
    {l:'Space',c:'KC_SPC',w:'w700'},{l:'Alt',c:'KC_RALT'},{l:'Fn',c:'KC_FN0'},
    {l:'Ctrl',c:'KC_RCTL'},{l:'←',c:'KC_LEFT'},{l:'↓',c:'KC_DOWN'},{l:'→',c:'KC_RGHT'},
  ],
]

const KEYCODES = [
  {l:'A',c:'KC_A'},{l:'B',c:'KC_B'},{l:'C',c:'KC_C'},{l:'D',c:'KC_D'},{l:'E',c:'KC_E'},
  {l:'F',c:'KC_F'},{l:'G',c:'KC_G'},{l:'H',c:'KC_H'},{l:'I',c:'KC_I'},{l:'J',c:'KC_J'},
  {l:'K',c:'KC_K'},{l:'L',c:'KC_L'},{l:'M',c:'KC_M'},{l:'N',c:'KC_N'},{l:'O',c:'KC_O'},
  {l:'P',c:'KC_P'},{l:'Q',c:'KC_Q'},{l:'R',c:'KC_R'},{l:'S',c:'KC_S'},{l:'T',c:'KC_T'},
  {l:'U',c:'KC_U'},{l:'V',c:'KC_V'},{l:'W',c:'KC_W'},{l:'X',c:'KC_X'},{l:'Y',c:'KC_Y'},
  {l:'Z',c:'KC_Z'},{l:'1',c:'KC_1'},{l:'2',c:'KC_2'},{l:'3',c:'KC_3'},{l:'4',c:'KC_4'},
  {l:'5',c:'KC_5'},{l:'6',c:'KC_6'},{l:'7',c:'KC_7'},{l:'8',c:'KC_8'},{l:'9',c:'KC_9'},
  {l:'0',c:'KC_0'},{l:'Enter',c:'KC_ENT'},{l:'Escape',c:'KC_ESC'},{l:'Backspace',c:'KC_BSPC'},
  {l:'Tab',c:'KC_TAB'},{l:'Space',c:'KC_SPC'},{l:'Caps Lock',c:'KC_CAPS'},
  {l:'Left Shift',c:'KC_LSFT'},{l:'Right Shift',c:'KC_RSFT'},
  {l:'Left Ctrl',c:'KC_LCTL'},{l:'Right Ctrl',c:'KC_RCTL'},
  {l:'Left Alt',c:'KC_LALT'},{l:'Right Alt',c:'KC_RALT'},
  {l:'Left GUI',c:'KC_LGUI'},{l:'Right GUI',c:'KC_RGUI'},
  {l:'Up',c:'KC_UP'},{l:'Down',c:'KC_DOWN'},{l:'Left',c:'KC_LEFT'},{l:'Right',c:'KC_RGHT'},
  {l:'F1',c:'KC_F1'},{l:'F2',c:'KC_F2'},{l:'F3',c:'KC_F3'},{l:'F4',c:'KC_F4'},
  {l:'F5',c:'KC_F5'},{l:'F6',c:'KC_F6'},{l:'F7',c:'KC_F7'},{l:'F8',c:'KC_F8'},
  {l:'F9',c:'KC_F9'},{l:'F10',c:'KC_F10'},{l:'F11',c:'KC_F11'},{l:'F12',c:'KC_F12'},
  {l:'Vol Up',c:'KC_VOLU'},{l:'Vol Down',c:'KC_VOLD'},{l:'Mute',c:'KC_MUTE'},
  {l:'Play/Pause',c:'KC_MPLY'},{l:'Next Track',c:'KC_MNXT'},{l:'Prev Track',c:'KC_MPRV'},
  {l:'No Op',c:'KC_NO'},{l:'Transparent',c:'KC_TRNS'},{l:'Del',c:'KC_DEL'},
]

type KeyDef = { l: string; c: string; w?: string }
type SelectedKey = { rowIndex: number; keyIndex: number }

type Keymap = {
  [layer: number]: {
    [rowIndex: number]: {
      [keyIndex: number]: KeyDef
    }
  }
}

const LAYERS = ['0 — base', '1 — fn', '2 — media']

export default function App() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [selected, setSelected] = useState<SelectedKey | null>(null)
  const [search, setSearch] = useState('')
  const [keymap, setKeymap] = useState<Keymap>({})

  function getKey(layer: number, ri: number, ki: number): KeyDef {
    return keymap[layer]?.[ri]?.[ki] ?? LAYOUT[ri][ki]
  }

  function assignKeycode(label: string, code: string) {
    if (!selected) return
    const { rowIndex: ri, keyIndex: ki } = selected
    const shortLabel = label.length > 5 ? label.slice(0, 4) : label
    setKeymap(prev => ({
      ...prev,
      [activeLayer]: {
        ...prev[activeLayer],
        [ri]: {
          ...prev[activeLayer]?.[ri],
          [ki]: { ...getKey(activeLayer, ri, ki), l: shortLabel, c: code },
        },
      },
    }))
  }

  const selectedKey = selected ? getKey(activeLayer, selected.rowIndex, selected.keyIndex) : null

  const filteredKeycodes = search
    ? KEYCODES.filter(k =>
        k.l.toLowerCase().includes(search.toLowerCase()) ||
        k.c.toLowerCase().includes(search.toLowerCase())
      )
    : KEYCODES

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="logo">exion<span>KE</span></div>
        <div className="top-actions">
          <button className="btn">import layout</button>
          <button className="btn">save keymap</button>
          <button className="btn primary">⚡ flash</button>
        </div>
      </div>

      {/* Layer bar */}
      <div className="layer-bar">
        <span className="layer-label">LAYER</span>
        {LAYERS.map((name, i) => (
          <button
            key={i}
            className={`layer-tab${activeLayer === i ? ' active' : ''}`}
            onClick={() => { setActiveLayer(i); setSelected(null) }}
          >
            {name}
          </button>
        ))}
        <button className="layer-tab">+ add</button>
      </div>

      {/* Main area */}
      <div className="main">
        <div className="canvas-area">
          <div className="keyboard">
            {LAYOUT.map((row, ri) => (
              <div key={ri} className="kb-row">
                {row.map((_, ki) => {
                  const key = getKey(activeLayer, ri, ki)
                  const isSelected = selected?.rowIndex === ri && selected?.keyIndex === ki
                  return (
                    <div
                      key={ki}
                      className={`key${key.w ? ' ' + key.w : ''}${isSelected ? ' selected' : ''}`}
                      onClick={() => setSelected({ rowIndex: ri, keyIndex: ki })}
                    >
                      <div className="key-main">{key.l}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">SELECTED KEY</div>
            {selectedKey ? (
              <div className="selected-key-info">
                <div className="key-preview">{selectedKey.l}</div>
                <div className="key-name">{selectedKey.l}</div>
                <div className="key-code">{selectedKey.c}</div>
              </div>
            ) : (
              <div className="empty-state">click a key to edit</div>
            )}
          </div>

          <div className="sidebar-section sidebar-keycodes">
            <div className="sidebar-title">ASSIGN KEYCODE</div>
            <input
              className="kc-search"
              placeholder="search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="keycode-list">
              {filteredKeycodes.map((k, i) => (
                <div
                  key={i}
                  className="keycode-item"
                  onClick={() => assignKeycode(k.l, k.c)}
                >
                  <span className="kc-label">{k.l}</span>
                  <span className="kc-code">{k.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <span><span className="status-dot" />tkl — 87 keys</span>
        <span>layer {activeLayer} active</span>
        <span>no device connected</span>
      </div>
    </div>
  )
}
