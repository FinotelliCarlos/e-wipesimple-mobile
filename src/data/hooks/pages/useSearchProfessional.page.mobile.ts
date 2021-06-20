import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function UseSearchProfessional() {
  const [cepAutomatic, serCepAutomatic] = useState("");
  const [coordinates, setCoordinates] =
    useState<{
      latitude: number;
      longitude: number;
    }>();

  useEffect(() => {
    (async () => {
      try {
        const gpsAllowed = await askPermission();
        if (gpsAllowed) {
          setCoordinates(await takeCoordinates());
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (coordinates) {
          serCepAutomatic(await takeCep());
        }
      } catch (error) {}
    })();
  }, [coordinates]);

  async function askPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      return false;
    }
  }

  async function takeCoordinates(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return location.coords;
  }

  async function takeCep(): Promise<string> {
    if (coordinates) {
      const address = await Location.reverseGeocodeAsync(coordinates);
      if (address.length > 0) {
        address[0].postalCode || "";
      }
    }
    return "";
  }

  return { cepAutomatic };
}
