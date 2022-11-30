import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../img/Logo/logo.png";
import React, { useState } from "react";
import { CustomTextField } from "../../components/common/CustomTextField";
import { CustomSelect } from "../../components/common/CustomSelect";
import { CustomButton } from "../../components/common/CustomButton";
import Loading from "../../components/Loading";
import userAPI from "../../api/userFunction";
import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material";
import orderApi from "../../api/orderApi";
import { PhotoCamera } from "@mui/icons-material";

export default function Profile() {
  const navigated = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>();
  const [paymentType, setPaymentType] = useState<any>([]);
  const [paymentValue, setPaymentValue] = useState<any>();
  const [valuePaymentNumber, setValuePaymentNumber] = useState<any>("");
  const [paymentApi, setPaymentApi] = useState<any>();
  const [provinceId, setProvinceId] = React.useState<any>("");
  const [provinces, setProvinces] = React.useState<any>([]);
  const [districtId, setDistrictId] = React.useState<any>("");
  const [districts, setDistricts] = React.useState<any>([]);
  const [wardId, setWardId] = React.useState<any>("");
  const [wards, setWards] = React.useState<any>([]);
  const [gender, setGender] = useState<string>("");
  const [image, setImage] = useState<any>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const dataTemp = new FormData(event.currentTarget);
    const provinceName = provinces.find(
      (item: any) => item.provinceId.toString() === provinceId
    );
    const wardName = wards.find((item: any) => item.wardId === wardId);
    const districtname = districts.find(
      (item: any) => item.districtId.toString() === districtId
    );
    const data = {
      name: dataTemp.get("name"),
      phone_number: dataTemp.get("phone_number"),
      address: dataTemp.get("address"),
      gender: dataTemp.get("Giới tính"),
      paymentType: dataTemp.get("paymentType"),
      paymentNumber: dataTemp.get("paymentNumber"),
      province_code: provinceId,
      district_code: districtId,
      ward_code: wardId,
      age: dataTemp.get("age"),
    };
    paymentApi.name = data.name;
    paymentApi.address = data.address;
    paymentApi.phone_number = data.phone_number;
    paymentApi.gender = data.gender;
    paymentApi.province_code = data.province_code;
    paymentApi.district_code = data.district_code;
    paymentApi.ward_code = data.ward_code;
    paymentApi.province = provinceName.name;
    paymentApi.ward = wardName.name;
    paymentApi.district = districtname.name;
    await userAPI.updateProfile(JSON.parse(JSON.stringify(paymentApi)));
  };
  React.useEffect(() => {
    const fetchProvince = async () => {
      const response: any = await orderApi.getProvinces();
      setProvinces(response.data);
    };
    fetchProvince();
    const fetch = async () => {
      setLoading(true);
      const respone: any = await userAPI.getInforUser();
      const responeAllPaymentType: any = await userAPI.paymentType();
      setPaymentType(responeAllPaymentType);
      setPaymentApi(respone.profile);
      setProfile(respone.profile);
      setImage(
        process.env.REACT_APP_API_BASE_URl_IMAGE + respone.profile.avatar
      );
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <Loading />;
  const handleChangePayment = (paymentValue: any) => {
    setPaymentValue(paymentValue);
    let checkId = false;
    for (const element of profile?.profile_payment_type) {
      if (element.payment_type.id === paymentValue) {
        checkId = true;

        setValuePaymentNumber(element.payment_number);
      }
    }
    if (checkId === false) {
      setValuePaymentNumber("");
    }
  };

  const fetchDistrict = async (provinceId: string) => {
    setDistricts([]);
    const response: any = await orderApi.getDistricts(provinceId);
    setDistricts(response.data);
  };

  const fetchWard = async (districtId: string) => {
    setWards([]);
    const response: any = await orderApi.getWards(districtId);
    setWards(response.data);
  };

  const handleProvinceChange = (provinceId: string) => {
    setProvinceId(provinceId);
    fetchDistrict(provinceId);
  };

  const handleDistrictChange = (districtId: string) => {
    setDistrictId(districtId);
    fetchWard(districtId);
  };

  const onChangeValuePayment = (e: any) => {
    let checkId = false;
    setValuePaymentNumber(e.target.value);
    for (const element of profile?.profile_payment_type) {
      if (element.payment_type.id === paymentValue) {
        checkId = true;
        for (const element of paymentApi.profile_payment_type) {
          if (element.payment_type.id === paymentValue) {
            element.payment_number = e.target.value;
          }
        }
      }
    }
    if (checkId === false) {
      paymentApi.profile_payment_type.push({
        payment_number: e.target.value,
        payment_type: {
          id: paymentValue,
        },
      });
    }
  };

  const handleUploadClick = (event: any) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e: any) {
      setImage([reader.result]);
    };
    setImage(event.target.files[0]);

    userAPI.uploadAvatar(event.target.files[0]).then();
  };

  return (
    <Grid container>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleUploadClick}
            />
            <Avatar
              src={image}
              style={{
                margin: "10px",
                width: "100px",
                height: "100px",
              }}
            />
          </IconButton>
          <Typography component="h1" variant="h5">
            Thông tin cá nhân
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Tên người dùng"
              autoFocus
              type="text"
              id="name"
              defaultValue={profile?.name}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="phone_number"
                label="Số điện thoại"
                type="text"
                id="phone_number"
                autoComplete="current-password"
                defaultValue={profile?.phone_number}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                label="Giới tính"
                options={[
                  { value: true, label: "Nam" },
                  { value: false, label: "Nữ" },
                ]}
                value={gender}
                setValue={setGender}
                defaultValue={profile?.gender}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomTextField
                margin="normal"
                required
                fullWidth
                id="age"
                label="Tuổi"
                name="age"
                autoComplete="age"
                defaultValue={profile?.age}
              />
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                margin="normal"
                required
                fullWidth
                name="certificate"
                label="Căn cước công dân"
                type="text"
                id="cerfiticate"
                defaultValue={profile?.certificate}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              defaultValue={profile?.email}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomSelect
                label="Thành phố"
                options={provinces?.map((item: any) => ({
                  value: item.provinceId,
                  label: item.name,
                }))}
                value={provinceId}
                setValue={handleProvinceChange}
                defaultValue={profile?.province_code}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomSelect
                label="Quận"
                options={districts?.map((item: any) => ({
                  value: item.districtId,
                  label: item.name,
                }))}
                value={districtId}
                setValue={handleDistrictChange}
                defaultValue={profile?.district_code}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomSelect
                label="Phường"
                options={
                  wards === null
                    ? []
                    : wards.map((item: any) => ({
                        value: item.wardId,
                        label: item.name,
                      }))
                }
                value={wardId}
                setValue={setWardId}
                defaultValue={profile?.ward_code}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Đia chỉ"
              name="address"
              autoComplete="address"
              defaultValue={profile?.address}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomSelect
                value={paymentValue}
                label="Phương thức"
                setValue={handleChangePayment}
                options={
                  paymentType === null
                    ? []
                    : paymentType?.map((item: any) => ({
                        value: item.id,
                        label: item.payment_name,
                      }))
                }
                defaultValue={profile?.profile_payment_type[0]?.payment_type.id}
              />
            </Grid>
            <Grid item xs={8}>
              <CustomTextField
                value={valuePaymentNumber}
                onChange={onChangeValuePayment}
                margin="normal"
                fullWidth
                id="paymentNumber"
                name="paymentNumber"
                autoComplete="paymentNumber"
                defaultValue={
                  profile?.profile_payment_type[0]?.payment_number ?? ""
                }
              />
            </Grid>
          </Grid>
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cập nhật
          </CustomButton>
        </Box>
      </Container>
    </Grid>
  );
}
