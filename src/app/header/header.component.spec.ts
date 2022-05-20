import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display email in header if there is an email', () => {
    component.userName = 'test@email.com'
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.username'))
    let el : HTMLElement = de.nativeElement;
    fixture.detectChanges();
    expect(el.innerHTML).toContain('test@email.com');
  });
});
