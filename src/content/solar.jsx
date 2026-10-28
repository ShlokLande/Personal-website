import { Photo, Screenshot, DiagramFigure } from '../components/Figure.jsx'
import { SolarDataPath, ImuBringup, ShtpPacket, I2cRecovery, Watchdogs, BusLoad, TelemetryPipeline } from '../diagrams/index.js'

export const meta = {
  title: 'UBC Solar',
  role: 'Embedded Software Developer',
  when: 'May 2026 to now',
  where: 'Vancouver',
  team: 'A student design team that designs and builds solar-powered race cars. We are building our next-generation car, Cascadia, to compete at FSGP 2027.',
  mine: 'I write firmware on the embedded team: the IMU driver, its CAN telemetry, board watchdogs, and the dashboards the pit crew watches during testing.',
  tags: ['C', 'FreeRTOS', 'CAN', 'Grafana'],
  image: { src: 'solar/car.jpg', alt: 'Photo of the car or the team' },
}

/* The four pieces of work, in the order they appear on the page. */
export const work = [
  { id: 'imu', title: 'IMU bring-up and telemetry', line: 'SHTP/SH-2 driver from scratch, 100 Hz CAN frames' },
  { id: 'i2c', title: 'Debugging I2C lockups', line: 'Logic analyzer, then a bus-recovery routine' },
  { id: 'reliability', title: 'Keeping the boards alive', line: 'Watchdogs on 5 boards, a CAN bus-load metric' },
  { id: 'dashboards', title: 'Telemetry dashboards', line: 'Grafana over InfluxDB for the pit crew' },
]

export const page = {
  kicker: 'Experience, May 2026 to now, Vancouver',
  summary: 'Embedded Software Developer, writing firmware for our solar race car.',
  facts: [
    { label: 'Role', value: 'Embedded Software Developer' },
    { label: 'Subteam', value: 'Embedded' },
    { label: 'Built with', value: 'C, STM32 HAL, FreeRTOS, I2C, CAN, InfluxDB, Grafana, Docker' },
    {
      label: 'Team site',
      value: (
        <a href="https://ubcsolar.com/" target="_blank" rel="noopener">
          ubcsolar.com ↗
        </a>
      ),
    },
  ],
  intro: [
    {
      id: 'team',
      label: 'The team',
      body: (
        <>
          <Photo n={1} path="solar/car.jpg" alt="Photo of the car or the team" caption="UBC Solar's car." />
          <p>
            UBC Solar is a student design team that has been designing and building solar-powered race cars since 1997. More
            than 70 students across nine subteams, from aeroshell and structures to battery management and embedded, work on
            each car, with the aim of making it as light and efficient as possible.
          </p>
          <p>
            We&apos;re building our next-generation car, Cascadia, the successor to Brightside, to compete at FSGP 2027, the
            Formula Sun Grand Prix. Inside the car, the boards talk to each other over a CAN bus, and telemetry streams to the
            pit so the team can watch the car while it runs.
          </p>
        </>
      ),
    },
    {
      id: 'path',
      label: 'Where my work sits',
      body: (
        <>
          <DiagramFigure n={2} caption="How IMU data gets from the car to the pit crew's screen.">
            <SolarDataPath />
          </DiagramFigure>
          <p>
            I&apos;m on the Embedded subteam. My work follows the IMU&apos;s data from the sensor, onto the car&apos;s CAN bus
            and over the air, to the dashboards the pit crew watches, along with the watchdogs that keep the boards running.
          </p>
        </>
      ),
    },
  ],
  sections: [
    {
      id: 'imu',
      label: 'IMU bring-up and telemetry',
      body: (
        <>
          <p>
            The BNO086 is a 9-axis IMU with its own sensor-fusion processor. It doesn&apos;t work through plain register
            reads: it talks SHTP, a packet protocol, with SH-2 sensor reports carried inside. I wrote the host side of
            SHTP/SH-2 from scratch in C.
          </p>
          <DiagramFigure n={3} caption="One SHTP packet: a four-byte header, then the SH-2 report.">
            <ShtpPacket />
          </DiagramFigure>
          <p>
            I brought the sensor up on a bare-metal bench build first, on a Nucleo-F103RB, and moved it into the car&apos;s
            FreeRTOS firmware once it worked there.
          </p>
          <DiagramFigure n={4} caption="Bench first, then the car.">
            <ImuBringup />
          </DiagramFigure>
          <p>
            On the car, an IMU task packs orientation, acceleration and magnetic-field data into CAN frames at 100 Hz. They
            go out on the telemetry bus and over the air by radio and cellular. On the ground, the frames are decoded with the
            car&apos;s DBC file, which describes every CAN message and signal.
          </p>
        </>
      ),
    },
    {
      id: 'i2c',
      label: 'Debugging I2C lockups',
      body: (
        <>
          <p>
            During bring-up the I2C bus kept locking up, and the only fix was to power-cycle the board by hand. I put a logic
            analyzer on the bus to see what was happening when it hung, then wrote a bus-recovery routine that frees the bus
            without a power-cycle. The hangs that needed one are gone.
          </p>
          <DiagramFigure n={5} caption="What a lockup cost before the recovery routine, and what happens now.">
            <I2cRecovery />
          </DiagramFigure>
          <Photo n={6} path="solar/logic-analyzer.png" alt="Logic analyzer capture of the lockup" caption="A logic analyzer capture of the bus." />
        </>
      ),
    },
    {
      id: 'reliability',
      label: 'Keeping the boards alive',
      body: (
        <>
          <p>
            A firmware hang on a moving car shouldn&apos;t need someone to reach for a switch. I configured the independent
            watchdog (IWDG) on 5 of the car&apos;s onboard boards. Each board&apos;s firmware has to refresh its watchdog regularly;
            if it hangs, the watchdog resets the board and it comes back on its own.
          </p>
          <DiagramFigure n={7} caption="A hang stops the refreshes, the watchdog runs out, and the board resets.">
            <Watchdogs />
          </DiagramFigure>
          <p>
            I also added a CAN bus-load metric that reports live utilization, so the team can schedule new messages without
            saturating the bus.
          </p>
          <DiagramFigure n={8} caption="The bus-load metric shows how much room is left before adding a message.">
            <BusLoad />
          </DiagramFigure>
        </>
      ),
    },
    {
      id: 'dashboards',
      label: 'Telemetry dashboards',
      body: (
        <>
          <p>
            I built Grafana dashboards over InfluxDB, writing Flux queries that stream live CAN signals to the pit crew during
            testing. I ran the team&apos;s telemetry stack locally in Docker to build and test them.
          </p>
          <DiagramFigure n={9} caption="The ground side of telemetry.">
            <TelemetryPipeline />
          </DiagramFigure>
          <Screenshot n={10} path="solar/grafana.png" alt="A Grafana telemetry dashboard" caption="One of the dashboards." />
        </>
      ),
    },
  ],
  skills: ['C', 'STM32 HAL', 'FreeRTOS', 'I2C', 'CAN', 'DBC', 'Logic analyzer', 'InfluxDB', 'Flux', 'Grafana', 'Docker'],
}
