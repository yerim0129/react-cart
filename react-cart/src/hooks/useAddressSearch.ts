const useAddressSearch = (onSelect: (address: string) => void) => {
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const address =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        onSelect(address);
      },
    }).open();
  };
  return {openAddressSearch};
};

export default useAddressSearch;
