{
  pairCreateds(first: 5) {
    id
    tokenA
    tokenB
    pair
  }
  reserves(first: 5) {
    id
    reserve0
    reserve1
    blockNumber
  }
}


{
  "data": {
    "pairCreateds": [
      {
        "id": "0x08aee9264126ef1798a212c41bf32102ca0549db173a8a754d2bedc5c044cefe02000000",
        "tokenA": "0xa7d07211ffa3b3dc0980301d34fa7a2e6301f912",
        "tokenB": "0x4200000000000000000000000000000000000006",
        "pair": "0xee98f0bf770428c862531fcf18eba6e91753043e"
      },
      {
        "id": "0x455a5dd2b894316fde584187da58ec33ba255ea24adf4966f72579e3d6e0b1ea02000000",
        "tokenA": "0xc42cbb31eab2ac6e56a82f986ab5c3fbb78cf3b1",
        "tokenB": "0x4200000000000000000000000000000000000006",
        "pair": "0xa03f44efb5ce939b26ca2d45780a34f56758d894"
      }
    ],
    "reserves": []
  }
}