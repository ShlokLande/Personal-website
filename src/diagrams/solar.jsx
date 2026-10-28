import { Diagram, Box, Arrow, T, Region, C, useDiagramId } from './kit.jsx'

/* Where the IMU data goes: sensor to pit crew. */
export function SolarDataPath() {
  return (
    <Diagram w={760} h={262} label="Data path: the BNO086 IMU talks I2C to an STM32 running FreeRTOS, which sends CAN frames on the car's bus. Radio and cellular carry them to the pit, where InfluxDB stores them and Grafana shows them to the pit crew.">
      <Region x={6} y={6} w={748} h={104} label="On the car" />
      <Box x={20} y={36} w={130} h={58} title="BNO086" sub="IMU" />
      <Arrow d="M150 65 H206" label="I2C" lx={178} ly={57} />
      <Box x={210} y={36} w={150} h={58} title="STM32F103" sub="FreeRTOS" tone="leaf" />
      <Arrow d="M360 65 H416" label="CAN" lx={388} ly={57} />
      <Box x={420} y={36} w={140} h={58} title="CAN bus" sub="all the boards" />
      <Arrow d="M560 65 H606" />
      <Box x={610} y={36} w={132} h={58} title="Radio + cellular" />

      <Region x={6} y={142} w={748} h={114} label="In the pit" />
      <Arrow d="M676 94 V200 H566" label="over the air" lx={686} ly={156} anchor="start" dashed />
      <Box x={420} y={172} w={142} h={58} title="InfluxDB" sub="time-series store" />
      <Arrow d="M420 201 H364" />
      <Box x={210} y={172} w={150} h={58} title="Grafana" sub="live dashboards" tone="leaf" />
      <Arrow d="M210 201 H154" />
      <Box x={20} y={172} w={130} h={58} title="Pit crew" />
    </Diagram>
  )
}

/* Anatomy of one SHTP packet, the framing the BNO086 uses on I2C. */
export function ShtpPacket() {
  const cells = [
    { x: 20, w: 92, t: 'Length', s: 'low byte' },
    { x: 112, w: 92, t: 'Length', s: 'high byte' },
    { x: 204, w: 104, t: 'Channel' },
    { x: 308, w: 104, t: 'Sequence' },
    { x: 412, w: 328, t: 'Cargo: SH-2 report', s: 'report ID, then its data' },
  ]
  return (
    <Diagram w={760} h={196} label="An SHTP packet: a four-byte header (two length bytes, a channel byte and a sequence number) followed by the SH-2 report as cargo.">
      {['byte 0', 'byte 1', 'byte 2', 'byte 3', 'bytes 4 to n'].map((b, i) => (
        <T key={b} x={cells[i].x + cells[i].w / 2} y={38} anchor="middle" size={12} code>
          {b}
        </T>
      ))}
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={48} width={c.w} height={62} fill={i === 4 ? C.leaf : C.paper} stroke={C.ink} strokeWidth="1.3" />
          <T x={c.x + c.w / 2} y={c.s ? 75 : 84} anchor="middle" size={14.5} color={C.ink} weight={600}>
            {c.t}
          </T>
          {c.s && (
            <T x={c.x + c.w / 2} y={95} anchor="middle" size={12.5}>
              {c.s}
            </T>
          )}
        </g>
      ))}
      <path d="M20 124 V132 H412 V124" fill="none" stroke={C.ink} strokeWidth="1.2" />
      <T x={216} y={152} anchor="middle" size={13.5} color={C.ink}>
        4-byte SHTP header
      </T>
      <T x={216} y={172} anchor="middle" size={12.5}>
        top bit of the length marks a continued packet
      </T>
      <T x={576} y={152} anchor="middle" size={12.5}>
        channel picks the stream: control,
      </T>
      <T x={576} y={170} anchor="middle" size={12.5}>
        sensor reports, and so on
      </T>
    </Diagram>
  )
}

/* Bench first, car second. */
export function ImuBringup() {
  return (
    <Diagram w={760} h={232} label="Bring-up in two steps. First, on the bench: a Nucleo-F103RB talks to the BNO086 bare-metal to validate SHTP framing and sensor reports. Then, on the car: an IMU task in FreeRTOS hands readings to the CAN transmitter every 10 ms.">
      <Region x={6} y={6} w={344} h={220} label="1. On the bench, bare metal" />
      <Box x={24} y={48} w={140} h={58} title="Nucleo-F103RB" sub="no RTOS" />
      <Arrow d="M164 77 H198" both />
      <T x={181} y={69} anchor="middle" size={12.5}>I2C</T>
      <Box x={200} y={48} w={132} h={58} title="BNO086" sub="IMU" />
      <T x={24} y={146} size={13.5} color={C.ink}>Prove each layer in isolation:</T>
      <T x={24} y={168} size={13}>SHTP packets frame correctly</T>
      <T x={24} y={188} size={13}>SH-2 reports enable and arrive</T>

      <Arrow d="M352 116 H404" label="then port" lx={378} ly={106} />

      <Region x={410} y={6} w={344} h={220} label="2. On the car, FreeRTOS" />
      <Box x={428} y={48} w={142} h={58} title="IMU task" sub="reads the sensor" tone="leaf" />
      <Arrow d="M570 77 H596" />
      <Box x={598} y={48} w={140} h={58} title="CAN transmit" sub="packs the frames" />
      <Arrow d="M668 106 V146" />
      <Box x={540} y={150} w={198} h={58} title="Telemetry bus" sub="every 10 ms (100 Hz)" tone="hi" />
      <T x={428} y={146} size={13}>orientation,</T>
      <T x={428} y={164} size={13}>acceleration,</T>
      <T x={428} y={182} size={13}>magnetic field</T>
    </Diagram>
  )
}

/* Before and after the bus-recovery routine. */
export function I2cRecovery() {
  return (
    <Diagram w={760} h={214} label="Before: when the I2C bus locked up, the board stayed stuck until someone power-cycled it by hand. After: a recovery routine frees the bus and reads resume on their own.">
      <T x={20} y={46} size={14} color={C.ink} weight={600}>Before</T>
      <Box x={100} y={20} w={170} h={50} title="Bus locks up" />
      <Arrow d="M270 45 H316" muted />
      <Box x={320} y={20} w={190} h={50} title="Board stays stuck" />
      <Arrow d="M510 45 H556" muted />
      <Box x={560} y={20} w={180} h={50} title="Power-cycle by hand" tone="ghost" dashed />

      <line x1="20" y1="104" x2="740" y2="104" stroke={C.line} strokeDasharray="4 5" />

      <T x={20} y={166} size={14} color={C.ink} weight={600}>After</T>
      <Box x={100} y={140} w={170} h={50} title="Bus locks up" />
      <Arrow d="M270 165 H316" />
      <Box x={320} y={140} w={190} h={50} title="Recovery routine" sub="frees the bus" tone="hi" />
      <Arrow d="M510 165 H556" />
      <Box x={560} y={140} w={180} h={50} title="Reads resume" tone="leaf" />
    </Diagram>
  )
}

/* What an independent watchdog does when firmware hangs. */
export function Watchdogs() {
  const id = useDiagramId()
  const before = [70, 120, 170, 220, 270]
  const after = [520, 570, 620, 670, 720]
  return (
    <Diagram w={760} h={206} label="Watchdog timeline: running firmware refreshes the watchdog regularly. When the firmware hangs the refreshes stop, the watchdog times out and resets the board, and refreshes resume.">
      <line x1="30" y1="132" x2="744" y2="132" stroke={C.ink} strokeWidth="1.4" />
      <T x={744} y={152} anchor="end" size={12.5}>time</T>
      {[...before, ...after].map((x) => (
        <g key={x}>
          <line x1={x} y1="112" x2={x} y2="132" stroke={C.fern} strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
      <T x={170} y={102} anchor="middle" size={13} color={C.ink}>firmware refreshes the watchdog</T>
      <WatchdogHang id={id} />
      <T x={620} y={102} anchor="middle" size={13} color={C.ink}>refreshes resume</T>
      <T x={30} y={186} size={13}>Set up on 5 boards, so any one of them recovers without someone reaching for the power switch.</T>
    </Diagram>
  )
}

function WatchdogHang({ id }) {
  return (
    <g>
      <rect x="290" y="112" width="182" height="20" fill={`url(#hatch${id})`} stroke={C.line} />
      <T x={381} y={150} anchor="middle" size={12.5}>firmware hangs</T>
      <rect x="290" y="40" width="182" height="22" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="1.2" />
      <rect x="290" y="40" width="182" height="22" rx="4" fill={C.hi} opacity="0.75" />
      <T x={381} y={56} anchor="middle" size={12.5} color={C.ink}>watchdog counts down</T>
      <line x1="480" y1="34" x2="480" y2="140" stroke={C.fern} strokeWidth="2" strokeDasharray="4 4" />
      <T x={486} y={30} size={13} color={C.fern} weight={600}>reset</T>
    </g>
  )
}

/* Bus-load metric: how full the CAN bus is right now. */
export function BusLoad() {
  const segs = [90, 70, 120, 60, 54]
  let x = 30
  return (
    <Diagram w={760} h={178} label="Bus-load bar: existing messages fill part of the CAN bus's capacity, and the live load reading shows how much room is left for new messages.">
      <T x={30} y={34} size={13} color={C.ink}>load = bits on the bus each second, divided by the bus bit rate</T>
      <rect x="30" y="56" width="700" height="44" rx="6" fill={C.paper} stroke={C.ink} strokeWidth="1.3" />
      {segs.map((w, i) => {
        const r = <rect key={i} x={x + 1} y="57" width={w - 2} height="42" fill={C.leaf} stroke={C.paper} strokeWidth="2" />
        x += w
        return r
      })}
      <T x={(30 + x) / 2} y={84} anchor="middle" size={13} color={C.fern} weight={600}>existing messages</T>
      <T x={(x + 730) / 2} y={84} anchor="middle" size={13}>room for new messages</T>
      <line x1={x} y1="46" x2={x} y2="110" stroke={C.ink} strokeWidth="2" />
      <T x={x} y={132} anchor="middle" size={13} color={C.ink} weight={600}>live load reading</T>
      <T x={x} y={150} anchor="middle" size={12.5}>measured while the car runs</T>
    </Diagram>
  )
}

/* The ground side of telemetry. */
export function TelemetryPipeline() {
  return (
    <Diagram w={760} h={200} label="Telemetry stack: CAN frames arrive from the car, a parser decodes them with the car's DBC file, InfluxDB stores them, and Grafana dashboards built on Flux queries show them to the pit crew.">
      <Box x={14} y={70} w={128} h={60} title="CAN frames" sub="from the car" />
      <Arrow d="M142 100 H182" />
      <Region x={186} y={14} w={420} h={172} label="Run locally in Docker" />
      <Box x={204} y={70} w={122} h={60} title="Parser" sub="decodes with DBC" />
      <Arrow d="M326 100 H346" />
      <Box x={348} y={70} w={110} h={60} title="InfluxDB" />
      <Arrow d="M458 100 H478" />
      <Box x={480} y={70} w={112} h={60} title="Grafana" sub="Flux queries" tone="leaf" />
      <Arrow d="M606 100 H632" />
      <Box x={634} y={70} w={114} h={60} title="Pit crew" sub="during testing" tone="hi" />
    </Diagram>
  )
}
