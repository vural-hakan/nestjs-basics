import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fixtures' })
export class FixturesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  homeTeam: string;

  @Column()
  awayTeam: string;

  @Column()
  FTHG: number;

  @Column()
  FTAG: number;

  @Column()
  referee: string;

  @Column()
  season: string;

  @Column()
  league: string;
}
