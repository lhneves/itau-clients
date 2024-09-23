import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ClientCardComponent } from './client-card.component';

import { IClient } from '../../models/clients.model';
import { ClientService } from '../../service/client.service';

import { ConfirmationService } from 'primeng/api';

import { of } from 'rxjs';

describe('ClientCardComponent', () => {
  let component: ClientCardComponent;
  let fixture: ComponentFixture<ClientCardComponent>;
  let mockClientService: jasmine.SpyObj<ClientService>;

  const mockClient: IClient = {
    codigo_cliente: '0001',
    nome: 'Cliente 1',
    risco: 'alto',
  };

  beforeEach(async () => {
    mockClientService = jasmine.createSpyObj('ClientService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [ClientCardComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
        ConfirmationService,
        { provide: ClientService, useValue: mockClientService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCardComponent);
    component = fixture.componentInstance;
    component.clientInfo = mockClient;
    fixture.detectChanges();
  });

  it('should display the client details correctly', () => {
    const riskEl = fixture.debugElement.query(
      By.css('[data-testid="risk-data"]')
    ).nativeElement;
    const codeEl = fixture.debugElement.query(
      By.css('[data-testid="codigo-cliente-data"]')
    ).nativeElement;
    const nameEl = fixture.debugElement.query(
      By.css('[data-testid="client-name-data"]')
    ).nativeElement;

    expect(riskEl.textContent).toContain('alto');
    expect(codeEl.textContent).toContain('Código: #0001');
    expect(nameEl.textContent).toContain('Cliente 1');
  });

  it('should navigate to the details route when clicking details button', () => {
    const editButton = fixture.debugElement.query(
      By.css('[data-testid="btn-details"]')
    ).nativeElement;
    expect(editButton.getAttribute('href')).toBe('/client/0001');
  });

  it('should call confirm dialog on button click', async () => {
    spyOn(component, 'confirmDelete');

    const deleteButton = fixture.debugElement.query(By.css('button'));
    deleteButton.nativeElement.click();

    expect(component.confirmDelete).toHaveBeenCalled();
  });

  it('should delete the client and emit deleteEvent on confirm', () => {
    mockClientService.delete.and.returnValue(of({}));
    spyOn(component.deleteEvent, 'emit');

    const deleteButton = fixture.debugElement.query(By.css('button'));
    deleteButton.nativeElement.click();

    fixture.detectChanges();

    const acceptBtn = fixture.debugElement.query(
      (debugEl) =>
        debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Sim'
    );

    acceptBtn.nativeElement.click();

    expect(mockClientService.delete).toHaveBeenCalledWith('0001');
    expect(component.deleteEvent.emit).toHaveBeenCalled();
  });
});
