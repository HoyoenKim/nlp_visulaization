import sys
import random

def koBert(keyword):
  ret = []
  for i in range(0, 6):
    ret.append(random.randint(1, 100))
  return ret

if __name__ == "__main__":
  keyword = sys.argv[1]
  print(koBert(keyword))

