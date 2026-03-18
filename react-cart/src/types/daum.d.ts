interface Window {
  daum: {
    Postcode: new (config: DaumPostcodeConfig) => DaumPostcodeInstance;
  };
}

interface DaumPostcodeConfig {
  oncomplete: (data: DaumPostcodeData) => void;
}

interface DaumPostcodeData {
  address: string;
  addressType: string;
  userSelectedType: string;
  roadAddress: string;
  jibunAddress: string;
}

interface DaumPostcodeInstance {
  open: () => void;
}
