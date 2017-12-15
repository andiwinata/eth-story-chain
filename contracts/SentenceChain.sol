pragma solidity ^0.4.18;

contract SentenceChain {
  uint256 sentenceId = 0;
  event SentenceCreated(address indexed author, uint256 indexed sentenceId, bytes32 sentence);
  event SentenceCreatedHash(address indexed author, bytes32 indexed sentenceId, bytes32 sentence);

  function createSentenceWithInternalId(bytes32 sentence) returns (uint256) {
    sentenceId++;
    SentenceCreated(msg.sender, sentenceId, sentence);
  }

  function createSentenceWithHash(bytes32 sentence) returns (bytes32) {
    var hash = sha3(sentence);
    SentenceCreatedHash(msg.sender, hash, sentence);
  }
}
