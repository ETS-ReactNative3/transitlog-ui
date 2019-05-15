import "../components/LineIcon.css";

function getTransportType(lineId, numeric = false) {
  const lineType = lineId.substring(0, 4);

  if (lineType >= 1001 && lineType <= 1010) {
    if (numeric) {
      return 0;
    }

    return "TRAM";
  }

  // Subway route ID's all start with 31M
  if (lineId.startsWith("1019")) {
    if (numeric) {
      return 50;
    }

    return "FERRY";
  }

  // Subway route ID's all start with 31M
  if (lineId.startsWith("31M")) {
    if (numeric) {
      return 20;
    }

    return "SUBWAY";
  }

  if (/^300[12]/.test(lineType)) {
    if (numeric) {
      return 100;
    }

    return "RAIL";
  }

  if (lineType.substr(1) === "560" || lineType.substr(1) === "550") {
    if (numeric) {
      return 1000;
    }

    return "TRUNK";
  }

  if (numeric) {
    return 1000;
  }

  return "BUS";
}

export default getTransportType;
