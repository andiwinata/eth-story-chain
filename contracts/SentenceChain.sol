pragma solidity ^0.4.18;

contract SentenceChain {
  uint256 sentenceId = 0;
  event SentenceCreated(address indexed author, uint256 indexed sentenceId, uint256 indexed parentSentenceId, bytes32 sentence);

  function createSentence(bytes32 sentence, uint256 parentSentenceId) external returns (uint256) {
    require(parentSentenceId <= sentenceId);
    sentenceId++;
    SentenceCreated(msg.sender, sentenceId, parentSentenceId, sentence);
    return sentenceId;
  }
}
