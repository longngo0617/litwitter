import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { ItemOption } from "./ItemOption";
import StorefrontIcon from "@material-ui/icons/Storefront";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VideocamIcon from "@material-ui/icons/Videocam";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import BuildIcon from "@material-ui/icons/Build";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DeckIcon from "@material-ui/icons/Deck";
import TvIcon from "@material-ui/icons/Tv";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import HouseIcon from "@material-ui/icons/House";
import PetsIcon from "@material-ui/icons/Pets";
import ToysIcon from "@material-ui/icons/Toys";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

interface BarProps {
  fc: () => void;
}

export const Bar: React.FC<BarProps> = ({ fc }) => {
  const [value, setValue] = useState("");
  const router= useHistory();
  return (
    <FilterBarContainer>
      <FilterBar>
        <Header>
          <ArrowBack onClick={() => router.replace("/")}/>
          <Head>Marketplace</Head>
        </Header>
        <Border>
          <InputContainer>
            <InputIcon />
            <Input
              name="displayname"
              autoComplete="off"
              placeholder="Tìm kiếm trên market place"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              // onClick={fc}
            />
          </InputContainer>
          <ArrayHintWrap></ArrayHintWrap>
        </Border>
        <Category>
          <Wrap>
            <ItemOption
              href="/market/all"
              text="Lướt xem tất cả"
              IconN={StorefrontIcon}
            />
            <ItemOption
              href="/market/you/selling"
              text="Tài khoản của bạn "
              IconN={PersonIcon}
            />
            <ButtonWrap>
              <Button onClick={fc}>
                <IconAdd />
                <Text>Tạo bài niêm yết mới</Text>
              </Button>
            </ButtonWrap>
            <Type>Hạng mục</Type>
            <ItemOption
              href="/market/category/xe-co"
              text="Xe cộ"
              IconN={DirectionsCarIcon}
            />
            <ItemOption
              href="/market/category/dung-cu-sua-chua-nha-cua"
              text="Dụng cụ sửa chữa nhà cửa "
              IconN={BuildIcon}
            />
            <ItemOption
              href="/market/category/gia-dinh"
              text="Gia Đình"
              IconN={FavoriteIcon}
            />
            <ItemOption
              href="/market/category/giai-tri"
              text="Giải trí"
              IconN={VideocamIcon}
            />
            <ItemOption
              href="/market/category/lam-vuon-va-hoat-dong-ngoai-troi"
              text="Làm vườn và hoạt động ngoài trời "
              IconN={DeckIcon}
            />
            <ItemOption
              href="/market/category/nhac-cu"
              text="Nhạc cụ "
              IconN={AudiotrackIcon}
            />
            <ItemOption
              href="/market/category/rao-vat"
              text="Rao vặt "
              IconN={LocalOfferIcon}
            />
            <ItemOption
              href="/market/category/san-pham-the-thao"
              text="Sản phẩm thể thao "
              IconN={DirectionsRunIcon}
            />
            <ItemOption
              href="/market/category/tai-san-cho-thue"
              text="Tài sản cho thuê"
              IconN={LocalAtmIcon}
            />
            <ItemOption
              href="/market/category/ban-nha"
              text="Bán nhà"
              IconN={HouseIcon}
            />
            <ItemOption
              href="/market/category/do-dung-cho-thu-cung"
              text="Đồ dùng cho thú cưng"
              IconN={PetsIcon}
            />
            <ItemOption
              href="/market/category/do-may-mac"
              text="Đồ may mặc"
              IconN={ToysIcon}
            />
            <ItemOption
              href="/market/category/do-dien-tu"
              text="Đồ điện tử"
              IconN={TvIcon}
            />
          </Wrap>
        </Category>
      </FilterBar>
    </FilterBarContainer>
  );
};
const FilterBarContainer = styled.div`
  min-width: 360px;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
`;
const FilterBar = styled.div`
  position: fixed;
  width: 360px;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid rgb(235, 238, 240);
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  top: 0;
  box-shadow: 4px 2px 5px 0px rgba(0, 0, 0, 0.22);
`;
const Header = styled.div`
  padding: 12px 16px;
  position: relative;
  display: flex;
  align-items: center;
`;
const Head = styled.h2`
  font-size: 28px;
  font-weight: 800;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const ArrowBack = styled(ArrowBackIcon)`
  cursor:pointer;
  color:#1877f2;
  margin-right:15px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: #f0f2f5;
  border-radius: 9999px;
`;
const InputIcon = styled(SearchIcon)`
  color: rgb(91, 112, 131);
  padding: 6px;
`;
const Input = styled.input`
  flex: 1;
  border: 0;
  outline: none;
  padding: 10px;
  background-color: inherit;
  border-radius: inherit;
`;
const Border = styled.div`
  padding: 0 16px;
  position: relative;
  margin-bottom: 12px;
`;
const ArrayHintWrap = styled.div``;

const Category = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  will-change: transform, scroll-position;
  display: flex;
  z-index: 0;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  overscroll-behavior-y: contain;
`;
const Wrap = styled.div``;
const ButtonWrap = styled.div`
  margin: 8px 16px;
`;
const Button = styled.div`
  margin: 0;
  background-color: rgba(45, 156, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
`;
const IconAdd = styled(AddIcon)`
  color: #1877f2;
`;
const Text = styled.div`
  margin: 0 3px;
  font-family: inherit;
  font-size: 15px;
  color: #1877f2;
`;
const Type = styled.div`
  height: 36px;
  display: flex;
  align-items: flex-end;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 0 12px;
`;
