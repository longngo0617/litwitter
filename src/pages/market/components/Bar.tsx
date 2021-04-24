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
interface BarProps {}

export const Bar: React.FC<BarProps> = () => {
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState("");
  return (
    <FilterBarContainer>
      <FilterBar>
        <Header>
          <Head>Marketplace</Head>
        </Header>
        <Border>
          <InputContainer>
            <InputIcon />
            <Input
              name="displayname"
              autoComplete="off"
              placeholder="Search people"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onClick={() => setDisplay(!display)}
            />
          </InputContainer>
          <ArrayHintWrap></ArrayHintWrap>
        </Border>
        <Category>
          <Wrap>
            <ItemOption
              href="/market"
              text="Lướt xem tất cả"
              IconN={StorefrontIcon}
            />
            <ItemOption
              href="/market/you/selling"
              text="Tài khoản của bạn "
              IconN={PersonIcon}
            />
            <ButtonWrap>
              <Button>
                <IconAdd />
                <Text>Tạo bài niêm yết mới</Text>
              </Button>
            </ButtonWrap>
            <Type>Hạng mục</Type>
            <ItemOption
              href="/market/category/vehicles"
              text="Xe cộ"
              IconN={DirectionsCarIcon}
            />
            <ItemOption
              href="/market/category/home-improvements"
              text="Dụng cụ sửa chữa nhà cửa "
              IconN={BuildIcon}
            />
            <ItemOption
              href="/market/category/family"
              text="Gia Đình"
              IconN={FavoriteIcon}
            />
            <ItemOption
              href="/market/category/entertainment"
              text="Giải trí"
              IconN={VideocamIcon}
            />
            <ItemOption
              href="/market/category/garden"
              text="Làm vườn và hoạt động ngoài trời "
              IconN={DeckIcon}
            />
            <ItemOption
              href="/market/category/instrument"
              text="Nhạc cụ "
              IconN={AudiotrackIcon}
            />
            <ItemOption
              href="/market/category/classifieds"
              text="Rao vặt "
              IconN={LocalOfferIcon}
            />
            <ItemOption
              href="/market/category/fitness"
              text="Sản phẩm thể thao "
              IconN={DirectionsRunIcon}
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
