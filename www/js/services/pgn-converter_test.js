'use strict';

describe('pgnConverter', function() {
  var pgnConverter;

  beforeEach(module("melissa.services"));
  beforeEach(inject(function (_pgnConverter_) {
    pgnConverter = _pgnConverter_;
  }));

  describe('shortenPgn', function() {
    it('return short position as is', function() {
      expect(pgnConverter.shortenPgn('1.d4')).toEqual('1.d4');
    });
    it('return 14 moves as is', function() {
      var input = '1. d4 Nf6 2. c4 e6 3. Nc3 d5 4. Nf3 Bb4 5. e3 O-O 6. Bd3 b6 7. O-O Ba6 8. cxd5 Bxd3 9. Qxd3 Nxd5 10. Nxd5 Qxd5 11. e4 Qd8 12. Qb5 Be7 13. Rd1 Qe8 14. Qe2 c5';
      expect(pgnConverter.shortenPgn(input)).toEqual(input);
    });
    it('replaces 8th move in pgn of 15 moves', function() {
      var input = '1. d4 Nf6 2. c4 e6 3. Nc3 d5 4. Nf3 Bb4 5. e3 O-O 6. Bd3 b6 7. O-O Ba6 8. cxd5 Bxd3 9. Qxd3 Nxd5 10. Nxd5 Qxd5 11. e4 Qd8 12. Qb5 Be7 13. Rd1 Qe8 14. Qe2 c5 15. dxc5 Bxc5';
      var expected = '1. d4 Nf6 2. c4 e6 3. Nc3 d5 4. Nf3 Bb4 5. e3 O-O 6. Bd3 b6 7. O-O Ba6 <...> 9. Qxd3 Nxd5 10. Nxd5 Qxd5 11. e4 Qd8 12. Qb5 Be7 13. Rd1 Qe8 14. Qe2 c5 15. dxc5 Bxc5';
      expect(pgnConverter.shortenPgn(input)).toEqual(expected);
    });
    it('leaves only 7 start and 7 end in enourmous pgn', function() {
      var input = '1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. Bd3 dxe4 5. Bxe4 Nxe4 6. Nxe4 Be7 7. Nf3 O-O 8. O-O b6 9. c3 Bb7 10. Qd3 Nd7 11. Bf4 Nf6 12. Nxf6+ Bxf6 13. Ne5 Bg5 14. Bg3 Qf6 15. Nd7 Qd8 16. Nxf8 Qd5 17. f3 Rxf8 18. Rfe1 c5 19. Re5 Qd7 20. Rxg5 cxd4 21. Qxd4 Qe7 22. Re5 h6 23. Ree1 Rd8 24. Qa4 Qc5+ 25. Bf2 Qg5 26. Kh1 Rd2 27. Rf1 Rxb2 28. Qxa7 Bd5 29. Qa3 Rd2 30. Rad1 Rxa2 31. Qb4 b5 32. Rxd5 Qxd5 33. h3 Ra4 34. Qb2 Ra2 35. Qc1 Rd2 36. Qa3 Ra2 37. Qc1 Rd2 38. Qb1 Ra2 39. Kh2 Qd2 40. Qe1 Qb2 41. Qe3 Qc2 42. Qd4 Qb2 43. Qe3 Qd2 44. Qxd2 Rxd2 45. Kg3 Rc2 46. Rb1 Rxc3 47. Rxb5 Rc2 48. Rb8+ Kh7 49. Rb7 Kg6 50. Rc7 h5 51. Rxc2 e5 52. Rc5 Kf6 53. Rc6+ Ke7 54. Bc5+ Kd7 55. Rd6+ Kc7 56. Ba3 f6 57. Rd5 g5 58. Rc5+ Kb6 59. Kf2 h4 60. Rc8 Kb7 61. Rd8 Kc7 62. Rf8 Kd7 63. Rxf6 Ke8 64. Rg6 Kf7 65. Rxg5 Kf6 66. Rg4 Kf5 67. Rxh4 Kg5 68. Bb2 e4 69. Rxe4 Kf5 70. g3 Kg5 71. Rg4+ Kf5 72. h4 Ke6 73. h5 Kf5 74. h6 Ke6 75. h7 Kf7 76. h8=Q Ke6 77. Bc1 Kf5 78. Bg5 Kg6 79. Bh4+ Kf7 80. Qg8#';
      var expected = '1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. Bd3 dxe4 5. Bxe4 Nxe4 6. Nxe4 Be7 7. Nf3 O-O <...> Kf5 74. h6 Ke6 75. h7 Kf7 76. h8=Q Ke6 77. Bc1 Kf5 78. Bg5 Kg6 79. Bh4+ Kf7 80. Qg8#';
      expect(pgnConverter.shortenPgn(input)).toEqual(expected);
    });
  });
});
