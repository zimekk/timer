const { DMR_URL = "", VCR_URL = "", VCR_VOLUME = "100" } = process.env;

export async function setVolume(volume) {
  return (
    VCR_URL &&
    (async (volume) => (
      console.log({ volume }),
      await fetch(`${VCR_URL}/setVolume?volume=${volume}`).then((res) =>
        res.json(),
      )
    ))(volume)
  );
}

export const remote = async () => {
  console.log(["remote"], { DMR_URL, VCR_URL, VCR_VOLUME });

  await Promise.resolve()
    .then(() => {
      const signal = AbortSignal.timeout(1000);
      return Promise.all([
        DMR_URL && fetch(DMR_URL, { signal }).then((res) => res.ok),
        VCR_URL &&
          fetch(`${VCR_URL}/getStatus`, { signal }).then((res) => res.json()),
      ]);
    })
    .then(async ([tvOn, status]) => {
      const { power, input, volume, max_volume, ...rest } = status || {};
      console.log({ tvOn, power, input, volume, max_volume, rest });

      let setPower = undefined;
      if (!DMR_URL) {
      } else if (
        ["optical1"].includes(input) &&
        ["standby"].includes(power) &&
        tvOn
      ) {
        console.log(["powerOn"]);
        setPower = true;
      } else if (
        ["optical1"].includes(input) &&
        ["on"].includes(power) &&
        !tvOn
      ) {
        console.log(["standBy"]);
        setPower = false;
      }
      if (setPower !== undefined) {
        const newVolume = Number(VCR_VOLUME);
        if (volume !== newVolume) {
          await setVolume(newVolume);
        }
        VCR_URL &&
          (async (power) => (
            console.log({ power }),
            await fetch(`${VCR_URL}/setPower?power=${power}`).then((res) =>
              res.json(),
            )
          ))(setPower ? "on" : "standby");
      }
    })
    .catch((e) => {
      if (e.name === "TimeoutError") {
        console.log("remote.timeout");
      } else {
        console.error(e);
      }
    });
};

export default remote;
