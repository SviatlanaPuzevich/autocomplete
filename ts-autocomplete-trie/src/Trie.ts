type NodeValue = string | null;

class TrieNode {
  value: NodeValue;
  isCompleteWord: boolean;
  children: Map<string, TrieNode>;

  constructor(value: NodeValue = null) {
    this.value = value;
    this.isCompleteWord = false;
    this.children = new Map();
  }

  addChild(ch: string): TrieNode {
    if (!this.children.has(ch)) {
      this.children.set(ch, new TrieNode(ch));
    }

    return this.children.get(ch)!;
  }

  findChild(ch: string): TrieNode | undefined {
    return this.children.get(ch);
  }
}

class Trie {
  private readonly root = new TrieNode();

  constructor(words: string[] = []) {
    words.forEach((word) => this.addWord(word));
  }

  addWord(word: string): void {
    const normalizedWord = word.trim();

    if (!normalizedWord) return;

    let current = this.root;

    for (const ch of normalizedWord) {
      current = current.addChild(ch);
    }

    current.isCompleteWord = true;
  }

  search(prefix: string): string[] {
    if (!prefix) {
      return [];
    }

    const states = this.findPrefixStates(prefix);
    if (states.length === 0) {
      return [];
    }

    const result: Array<string> = [];

    for (const [key, node] of states) {
      if (node.isCompleteWord) {
        result.push(key);
      }
      this.collectWords(key, node, result);
    }

    return result;
  }

  private findPrefixStates(prefix: string): Array<[string, TrieNode]> {
    let states: Array<[string, TrieNode]> = [["", this.root]];

    for (const ch of prefix) {
      const nextLevel: Array<[string, TrieNode]> = [];

      for (const [word, node] of states) {
        const upper = node.findChild(ch.toUpperCase());
        const lower = node.findChild(ch.toLowerCase());

        if (upper) {
          nextLevel.push([word + upper.value, upper]);
        }

        if (lower && upper !== lower) {
          nextLevel.push([word + lower.value, lower]);
        }
      }

      if (nextLevel.length === 0) {
        return [];
      }
      states = nextLevel;
    }

    return states;
  }

  private collectWords(prefix: string, node: TrieNode, result: string[]): void {
    for (const child of node.children.values()) {
      const nextPrefix = prefix + child.value;

      if (child.isCompleteWord) {
        result.push(nextPrefix);
      }

      this.collectWords(nextPrefix, child, result);
    }
  }
}

export function createAutoComplete(sourceArray: Array<string>) {
  const trie = new Trie(sourceArray);
  return (prefix: string) => {
    return trie.search(prefix);
  };
}
