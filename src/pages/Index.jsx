import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import FactList from '@/components/FactList';

const Index = () => {
  const [facts, setFacts] = useState([]);
  const [newFact, setNewFact] = useState('');
  const [person, setPerson] = useState('bride');
  const [gameMode, setGameMode] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const addFact = () => {
    if (newFact.trim() !== '') {
      setFacts([...facts, { fact: newFact, person }]);
      setNewFact('');
      toast({
        title: "Fact added!",
        description: "Your fun fact has been added to the game.",
      });
    }
  };

  const startGame = () => {
    if (facts.length > 0) {
      setGameMode(true);
      setCurrentFactIndex(0);
      setScore(0);
    } else {
      toast({
        title: "No facts added",
        description: "Please add some facts before starting the game.",
        variant: "destructive",
      });
    }
  };

  const handleGuess = (guess) => {
    if (guess === facts[currentFactIndex].person) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "You guessed right!",
        variant: "default",
      });
    } else {
      toast({
        title: "Wrong!",
        description: `This fact was about the ${facts[currentFactIndex].person}.`,
        variant: "destructive",
      });
    }

    if (currentFactIndex < facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      setGameMode(false);
      toast({
        title: "Game Over!",
        description: `Your final score is ${score + (guess === facts[currentFactIndex].person ? 1 : 0)} out of ${facts.length}.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Wedding Fun Facts Game</h1>
      
      {!gameMode ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fact">Add a fun fact about the bride or groom:</Label>
            <Input
              id="fact"
              value={newFact}
              onChange={(e) => setNewFact(e.target.value)}
              placeholder="Enter a fun fact..."
            />
          </div>
          
          <RadioGroup value={person} onValueChange={setPerson} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bride" id="bride" />
              <Label htmlFor="bride">Bride</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="groom" id="groom" />
              <Label htmlFor="groom">Groom</Label>
            </div>
          </RadioGroup>
          
          <Button onClick={addFact}>Add Fact</Button>
          
          <div className="mt-8">
            <Button onClick={startGame} className="w-full">Start Game</Button>
          </div>
          
          <FactList facts={facts} />
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Guess who this fact is about:</h2>
          <p className="text-xl text-center">{facts[currentFactIndex].fact}</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => handleGuess('bride')}>Bride</Button>
            <Button onClick={() => handleGuess('groom')}>Groom</Button>
          </div>
          <p className="text-center">Score: {score} / {currentFactIndex + 1}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
