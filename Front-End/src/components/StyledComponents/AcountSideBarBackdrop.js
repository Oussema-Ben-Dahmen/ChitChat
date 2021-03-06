const { default: styled } = require("styled-components");

const AccountSideBarBackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: ${(props) => (props.isOpen ? "100vw" : "0")};
  background: none;
  backdrop-filter: ${(props) =>
    props.isOpen ? "blur(1px) brightness(0.6)" : "blur(0)"};
  --webkit-backdrop-filter: ${(props) =>
    props.isOpen ? "blur(1px) brightness(0.6)" : "blur(0)"};
  transition: all 1s;
`;

export default AccountSideBarBackDrop;
