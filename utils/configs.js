const PROVINCE = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Thành phố Hồ Chí Minh",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];
const PROVINCE_ID = [];
PROVINCE.forEach((item, index) => {
  PROVINCE_ID[item] = index;
});
class Provinces {
  provinces;
  constructor() {
    this.provinces = PROVINCE;
    this.provinceIds = PROVINCE_ID;
  }
  getProvinceId(province) {
    return this.provinceIds[province];
  }
  getProvinceName(provinceId) {
    return this.provinces[provinceId];
  }
}
class HotelTypes {
  types;
  constructor() {
    this.types = [
      "Commercial",
      "Resort",
      "Airport",
      "Casino",
      "Hostel",
      "Motel",
      "Floating",
      "Condotel",
      "Residences",
      "Serviced Apartment",
      "Pod",
    ];
  }
  getHotelType(typeId) {
    return this.types[typeId];
  }
  getHotelTypeId(type) {
    return this.types.indexOf(type);
  }
}
class DeviceTypes {
  types = new Map();
  constructor() {
    this.types = {
      Bedding: [],
      "Food And Beverage": ["Food And Beverage Facilities"],
      Bathroom: ["Bathroom Facilities"],
      "Media And Technology": [
        "Complementary elements",
        "Internet Facilities",
        "Phone Facilities",
        "Tv Facilities",
      ],
      "Service And Equipment": [
        "Comfort Features",
        "Electric Facilities",
        "Temperature Air Control",
        "Working Area",
        "Room Services",
        "Accessibility And Security",
      ],
    };
    this.types = new Map(Object.entries(this.types));
  }
  getDeviceType(type = "a/b") {
    const [type, subType] = type.split("/");
    return { type, subType };
  }
  getDeviceTypeId(type) {
    return this.types.indexOf(type);
  }
}
module.exports = {
  provinces: new Provinces(),
  hotelTypes: new HotelTypes(),
  deviceTypes: new DeviceTypes(),
};
