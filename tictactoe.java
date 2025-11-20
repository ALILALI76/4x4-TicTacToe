import java.util.Scanner;

public class tictactoe {
	//array mit quadraten 1 bis 16
	static String[] square = {"1  ","2  ","3  ","4  ","5  ","6  ","7  ","8  ","9  ","10 ","11 ","12 ","13 ","14 ","15 ","16 "};
	static boolean running = true;
	static Scanner input = new Scanner(System.in);
	static int MoveCounter = 1;

	public static void main(String[] args) {
		
		//Willkommenstext
		System.out.println("Willkommen beim 4x4 TicTacToe! \nSetze abwechselnd X oder O in die Felder 1-16 \nX beginnt.");
		System.out.println(" 1 | 2 | 3 | 4 \n---+---+---+---\n 5 | 6 | 7 | 8 \n---+---+---+---\n 9 |10 |11 |12 \n---+---+---+---\n13 |14 |15 |16 \n");
		
		//Gameloop
		while(running) {
			try {
				makeMove();
				
			//Errornachricht wenn keine gueltige Eingabe
			}catch(Exception e) {
				System.out.println("Zahl von 1-16 eingeben!");
			}
		}
		
	}
	
	private static void printSpielfeld() {
		System.out.println("==============\n");
		for(int i=0; i<16; i++) {
			if((i+1)%4==0) {
				System.out.print(square[i]);
				if(i<15) {
					System.out.print("\n---+---+---+---\n");					
				}
			}else{
				System.out.print(square[i]);				
				System.out.print("|");												
			}
		}
	}
	
	static void finishGame() {
		tictactoe.running = false;
	}
	
	static void makeMove() {
		int move;
		move = Integer.parseInt(input.next());
		
		//gueltige Eingabe
		if(move>=1 && move<=16) {
			//check ob gewaehltes Quadrat leer ist
			if(square[move-1]!=" X " && square[move-1]!=" O ") {
				//abwechselnd
				if(MoveCounter%2==0) {
					square[move-1]=" O ";
				}else {
					square[move-1]=" X ";
				}
				MoveCounter++;
				printSpielfeld();
				checkGameStatus(move);
				if(running) {					
					System.out.println("\n");
					System.out.println("nächster Zug: ");
				}
			}else {
				System.out.println("Ein noch nicht belegtes Spielfeld angeben!");
			}
		}else {
			System.out.println("Zahl zwischen 1-16 eingeben!");
		}
	}
	
	//prueft ob Spiel verloren wurde
	static void checkGameStatus(int i) {
		//alle moeglichen Ausrichtungen von 3er Kombinationen die zur Niederlage fuehren pruefen
		if(horizontalCheck(i)||verticalCheck(i)||diagonalLeftCheck(i)||diagonalRightCheck(i)||MoveCounter==17) {
			finishGame();
			System.out.println("");
			System.out.println("\nGAME FINISHED!" );
			//alle Felder besetzt und gleichstand
			if(MoveCounter<17) {
				System.out.println(square[i-1] + " lost! ");							
			}
		}
	}
	
	//ab hier 4 Methoden die jeweils die 4 moeglichen Ausrichtungen pruefen
	
	static boolean horizontalCheck(int i ) {
		int index = i-1;
		boolean answer = false;
		if(isFirstHorizontalSquare(i)) {
			if(square[index]==square[index+1] && square[index]==square[index+2]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isCentreHorizontalSquare(i) && !answer) {
			if(square[index]==square[index-1] && square[index]==square[index+1]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isLastHorizontalSquare(i) && !answer) {
			if(square[index]==square[index-1] && square[index]==square[index-2]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	static boolean verticalCheck(int i ) {
		int index = i-1;
		boolean answer = false;
		if(isFirstVerticalSquare(i)) {
			if(square[index]==square[index+4] && square[index]==square[index+8]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isCentreVerticalSquare(i) && !answer) {
			if(square[index]==square[index-4] && square[index]==square[index+4]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isLastVerticalSquare(i) && !answer) {
			if(square[index]==square[index-4] && square[index]==square[index-8]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	static boolean diagonalLeftCheck(int i ) {
		int index = i-1;
		boolean answer = false;
		if(isFirstDiagonalLeftSquare(i)) {
			if(square[index]==square[index+3] && square[index]==square[index+6]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isCentreDiagonalLeftSquare(i) && !answer) {
			if(square[index]==square[index-3] && square[index]==square[index+3]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isLastDiagonalLeftSquare(i) && !answer) {
			if(square[index]==square[index-3] && square[index]==square[index-6]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	static boolean diagonalRightCheck(int i ) {
		int index = i-1;
		boolean answer = false;
		if(isFirstDiagonalRightSquare(i)) {
			if(square[index]==square[index+5] && square[index]==square[index+10]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isCentreDiagonalRightSquare(i) && !answer) {
			if(square[index]==square[index-5] && square[index]==square[index+5]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		if(isLastDiagonalRightSquare(i) && !answer) {
			if(square[index]==square[index-5] && square[index]==square[index-10]) {
				answer = true;
			}else {
				answer = false;
			}
		}
		return answer;
	}
	
	//ab hier Methoden die definieren welches Quadrat am Anfang, in der Mitte oder am Ende einer 3er Kombination ist
	//um mithilfe von Index im square Feld nebeneinanderliegende Felder miteinander zu vergleichen
	
	static boolean isFirstHorizontalSquare(int i) {
		if(i==1||i==2||i==5||i==6||i==9||i==10||i==13||i==14) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isCentreHorizontalSquare(int i) {
		if(i==2||i==3||i==6||i==7||i==10||i==11||i==14||i==15) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isLastHorizontalSquare(int i) {
		if(i==3||i==4||i==7||i==8||i==11||i==12||i==15||i==16) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isFirstVerticalSquare(int i) {
		if(i>=1 && i<=8) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isCentreVerticalSquare(int i) {
		if(i>=5 && i<=12) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isLastVerticalSquare(int i) {
		if(i>=9 && i<=16) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isFirstDiagonalRightSquare(int i) {
		if(i==1||i==2||i==5||i==6) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isCentreDiagonalRightSquare(int i) {
		if(i==6||i==7||i==10||i==11) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isLastDiagonalRightSquare(int i) {
		if(i==11||i==12||i==15||i==16) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isFirstDiagonalLeftSquare(int i) {
		if(i==3||i==4||i==7||i==8) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isCentreDiagonalLeftSquare(int i) {
		if(i==6||i==7||i==10||i==11) {
			return true;
		}else{
			return false;
		}
	}
	
	static boolean isLastDiagonalLeftSquare(int i) {
		if(i==9||i==10||i==13||i==14) {
			return true;
		}else{
			return false;
		}
	}

}
