import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

// from app
import { PAGES } from 'src/constants/page';
import usePageTransition from 'src/hooks/usePageTransition';
import EmptyContent from 'src/components/partials/EmptyContent';
import { IShopList } from 'src/interfaces/api/response/Shop';

interface Props {
  data: IShopList;
  loading: boolean;
}

/** 店舗リスト */
const ShopList: React.FC<Props> = (props: Props) => {
  const { data, loading } = props;
  const classes = useStyles();

  const { moveToShopDetail } = usePageTransition();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.shopList.length === 0) {
    return <EmptyContent link={PAGES.SHOPS_REGISTER.path} />;
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>店舗名</TableCell>
              <TableCell>サービス名</TableCell>
              <TableCell>エリア</TableCell>
              <TableCell>住所</TableCell>
              <TableCell>レビュー数</TableCell>
              <TableCell>評価</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.shopList.map((shop) => (
              <TableRow key={shop.shopId}>
                <TableCell>{shop.shopName}</TableCell>
                <TableCell>{shop.wifiName}</TableCell>
                <TableCell>{shop.area}</TableCell>
                <TableCell>{shop.address}</TableCell>
                <TableCell>{shop.reviewCount}</TableCell>
                <TableCell>{shop.average}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={() => moveToShopDetail(shop.shopId)}
                  >
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

// styles
const useStyles = makeStyles({
  table: {
    minWidth: 640,
  },
  button: {
    padding: 0,
  },
});
const Container = styled.div``;

export default ShopList;
