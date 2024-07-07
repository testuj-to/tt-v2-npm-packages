
export const formatDuration = (durationSeconds: number, forceIncludeHours: boolean = false): string => {
    if (typeof durationSeconds !== "number") {
        return "00:00";
    }

    let minutes = Math.floor(Math.floor(durationSeconds) / 60);
    const seconds = Math.floor(durationSeconds) - (minutes * 60);

    const hours = minutes >= 60 ? Math.floor(minutes / 60) : null;
    if (hours) {
        minutes = minutes - (hours * 60);
    }

    const durationFormated = `${minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}:${seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}`;

    return (forceIncludeHours || hours) ? `${hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}:${durationFormated}` : durationFormated;
};
