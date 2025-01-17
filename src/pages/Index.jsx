import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Confetti from 'react-confetti';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import FactList from '@/components/FactList';

const Index = () => {
  const [facts, setFacts] = useState([]);
  const [newFact, setNewFact] = useState('');
  const [person, setPerson] = useState('bride');
  const [gameMode, setGameMode] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
    const isCorrect = guess === facts[currentFactIndex].person;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    toast({
      title: isCorrect ? "Correct!" : "Wrong!",
      description: isCorrect
        ? "You guessed right!"
        : `This fact was about the ${facts[currentFactIndex].person}.`,
      variant: isCorrect ? "default" : "destructive",
    });

    if (currentFactIndex < facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      setGameMode(false);
      setShowScoreModal(true);
      if (score > facts.length / 2) {
        setShowConfetti(true);
      }
    }
  };

  const closeScoreModal = () => {
    setShowScoreModal(false);
    setCurrentFactIndex(0);
    setScore(0);
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary"></div>
          
          <h1 className="text-4xl font-bold text-center mb-8 text-primary relative">
            Wedding Fun Facts Game
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl text-primary opacity-20">❀</span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-5xl text-primary opacity-20">❀</span>
          </h1>
          
          {!gameMode ? (
            <div className="space-y-6 bg-secondary p-8 rounded-lg shadow-md">
              <div className="space-y-2">
                <Label htmlFor="fact" className="text-lg">Add a fun fact about the bride or groom:</Label>
                <Input
                  id="fact"
                  value={newFact}
                  onChange={(e) => setNewFact(e.target.value)}
                  placeholder="Enter a fun fact..."
                  className="border-primary"
                />
              </div>
              
              <RadioGroup value={person} onValueChange={setPerson} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bride" id="bride" />
                  <Label htmlFor="bride" className="text-lg">Bride</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="groom" id="groom" />
                  <Label htmlFor="groom" className="text-lg">Groom</Label>
                </div>
              </RadioGroup>
              
              <Button onClick={addFact} className="bg-primary text-white hover:bg-primary/90">Add Fact</Button>
              
              <div className="mt-8">
                <Button onClick={startGame} className="w-full bg-primary text-white hover:bg-primary/90">Start Game</Button>
              </div>
              
              <FactList facts={facts} />
            </div>
          ) : (
            <div className="space-y-6 bg-secondary p-8 rounded-lg shadow-md">
              {currentFactIndex < facts.length ? (
                <>
                  <h2 className="text-2xl font-semibold text-center text-primary">Guess who this fact is about:</h2>
                  <p className="text-xl text-center">{facts[currentFactIndex].fact}</p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => handleGuess('bride')} className="bg-primary text-white hover:bg-primary/90">Bride</Button>
                    <Button onClick={() => handleGuess('groom')} className="bg-primary text-white hover:bg-primary/90">Groom</Button>
                  </div>
                  <p className="text-center text-lg">Score: {score} / {currentFactIndex}</p>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-primary">Game Over!</h2>
                  <p className="text-2xl">Your final score is:</p>
                  <p className="text-4xl font-bold text-primary">{score} / {facts.length}</p>
                  <Button onClick={() => {setGameMode(false); setCurrentFactIndex(0); setScore(0);}} className="mt-4 bg-primary text-white hover:bg-primary/90">
                    Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AlertDialog open={showScoreModal} onOpenChange={setShowScoreModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over!</AlertDialogTitle>
            <AlertDialogDescription>
              Your final score is {score} out of {facts.length}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeScoreModal}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Index;
