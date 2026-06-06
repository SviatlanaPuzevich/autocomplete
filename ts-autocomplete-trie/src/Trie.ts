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
    const normalizedWord = word.trim().toLowerCase();

    if (!normalizedWord) return;

    let current = this.root;

    for (const ch of normalizedWord) {
      current = current.addChild(ch);
    }

    current.isCompleteWord = true;
  }

  search(prefix: string): string[] {
    const normalizedPrefix = prefix.trim().toLowerCase();
    const result: string[] = [];
    let current = this.root;

    for (const ch of normalizedPrefix) {
      const next = current.findChild(ch);
      if (!next) {
        return [];
      }
      current = next;
    }

    if (current.isCompleteWord) {
      result.push(normalizedPrefix);
    }
    this.collectWords(normalizedPrefix, current, result);

    return result;
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
