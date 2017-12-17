pragma solidity ^0.4.18;

contract SentenceChain {
  uint256 sentenceId = 0;
  event SentenceCreatedUint(address indexed author, uint256 indexed sentenceId, uint256 indexed parentSentenceId, bytes32 sentence);

  mapping (bytes32 => byte) private sentenceIdRegistry;
  event SentenceCreatedHash(address indexed author, bytes32 indexed sentenceId, bytes32 indexed parentSentenceId, bytes32 sentence);

  function SentenceChain() public {
    sentenceIdRegistry[0x0] = 0x1;
  }

  function createSentenceWithInternalId(bytes32 sentence, uint256 parentSentenceId) external returns (uint256) {
    require(parentSentenceId <= sentenceId);
    sentenceId++;
    SentenceCreatedUint(msg.sender, sentenceId, parentSentenceId, sentence);
    return sentenceId;
  }

  function createSentenceWithHash(bytes32 sentence, bytes32 parentSentenceId) external returns (bytes32) {
    require(sentenceIdRegistry[parentSentenceId] == 0x1);

    var hash = keccak256(sentence);
    SentenceCreatedHash(msg.sender, hash, parentSentenceId, sentence);
    sentenceIdRegistry[hash] = 0x1;
    return hash;
  }
}
